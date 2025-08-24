-- Fix RLS policy for profiles table to allow user signup
-- Add INSERT policy so users can create their own profile during registration

-- Add policy to allow users to insert their own profile
CREATE POLICY "Users can insert own profile" ON profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);