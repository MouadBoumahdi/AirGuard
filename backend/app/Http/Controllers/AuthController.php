<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $credentials = $request->only('email', 'password');
        $token = Auth::guard('api')->attempt($credentials);

        if (!$token) {
            return response()->json(['error' => 'The provided credentials do not match our records.'], 401);
        }

        $user = Auth::guard('api')->user();

        // Check if the user is deactivated/banned
        if ($user->is_banned) {
            Auth::guard('api')->logout(); 
            
            return response()->json([
                'success' => false,
                'message' => 'Your operational account access has been suspended by an administrator. Please contact your local OCP plant system supervisor.'
            ], 403); 
        }

        return response()->json([
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }

    public function sendResetLink(Request $request)
        {
            $request->validate(['email' => 'required|email|exists:users,email']);

            $email = $request->email;
            $token = Str::random(64);

            DB::table('password_reset_tokens')->where('email', $email)->delete();

            DB::table('password_reset_tokens')->insert([
                'email' => $email,
                'token' => $token,
                'created_at' => Carbon::now()
            ]);

            // Send them back to the main site root with clean action variables
            $resetLink = "http://localhost:5173/?action=reset&token=" . $token . "&email=" . urlencode($email);

            Mail::send([], [], function ($message) use ($email, $resetLink) {
                $message->to($email)
                    ->subject('AirGuard: Reset Terminal Password Link')
                    ->html('
                        <div style="font-family: sans-serif; padding: 20px; color: #334155;">
                            <h3 style="color: #065f46;">AirGuard Password Reset</h3>
                            <p>Click the link below to load the new password creation form instantly:</p>
                            <p><a href="' . $resetLink . '" style="color: #065f46; font-weight: bold; text-decoration: underline;">Click Here to Reset Password</a></p>
                        </div>
                    ');
            });

            return response()->json([
                'success' => true,
                'message' => 'Reset link successfully sent to Mailtrap!'
            ]);
        }

    public function executeResetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required|string',
            'email' => 'required|email|exists:users,email',
            'password' => 'required|string|min:8',
        ]);

        // Lookup structural context record from password_reset_tokens
        $record = DB::table('password_reset_tokens')->where([
            'email' => $request->email,
            'token' => $request->token
        ])->first();

        if (!$record) {
            return response()->json(['success' => false, 'message' => 'Invalid reset token parameter context.'], 422);
        }

        // Process secure updates parameter entries mapping onto model hashes
        $user = User::where('email', $request->email)->first();
        $user->update([
            'password' => Hash::make($request->password)
        ]);

        // Wipe token entry record values cleanly from password_reset_tokens
        DB::table('password_reset_tokens')->where('email', $request->email)->delete();

        return response()->json([
            'success' => true,
            'message' => 'Your passcode has been updated! You can now log into your console.'
        ]);
    }

    public function logout()
    {
        Auth::guard('api')->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'environment_manager', // Default role for new registrations
            'is_banned' => false,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Account created successfully! Please sign in with your credentials.',
            'user' => $user
        ], 201);
    }
}