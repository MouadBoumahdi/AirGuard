<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    
public function index()
    {
        $users = User::where('role', 'environment_manager')->get();

        return response()->json([
            'success' => true,
            'users' => $users
        ], 200);
    }



    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8',
        ]);

        $manager = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
            'role' => 'environment_manager',
            'is_banned' => false, // Active by default
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Environment Manager created successfully!',
            'data' => $manager
        ], 201);
    }







    public function toggleBan($id)
    {
        $manager = User::where('role', 'environment_manager')->findOrFail($id);

        $manager->is_banned = !$manager->is_banned;
        $manager->save();

        $statusMessage = $manager->is_banned ? 'Account deactivated (Banned).' : 'Account activated (Unbanned).';

        return response()->json([
            'success' => true,
            'message' => $statusMessage,
            'data' => $manager
        ], 200);
    }





    public function updatePassword(Request $request)
{
    $validatedData = $request->validate([
        'currentPassword' => 'required|string',
        'newPassword' => 'required|string|min:8',
    ]);

    $user = $request->user(); 

    if (!Hash::check($validatedData['currentPassword'], $user->password)) {
        return response()->json([
            'success' => false,
            'message' => 'The provided current password does not match our records.'
        ], 422);
    }

    $user->update([
        'password' => Hash::make($validatedData['newPassword'])
    ]);

    return response()->json([
        'success' => true,
        'message' => 'Password updated successfully!'
    ], 200);
}
}


