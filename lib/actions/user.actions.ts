'use server'
// import { signIn, signOut } from '@/auth'
// import { IUserSignIn } from '@/types'
// import { redirect } from 'next/navigation'

import bcrypt from 'bcryptjs'
import { signIn, signOut } from '@/auth'
import { IUserSignIn, IUserSignUp } from '@/types'
import { UserSignUpSchema } from '../validator'
import { connectToDatabase } from '../db'
import User from '../db/models/user.model'
import { formatError } from '../utils'
import { redirect } from 'next/navigation'


export async function signInWithCredentials(user: IUserSignIn) {
  return await signIn('credentials', { ...user, redirect: false })
}
export const SignOut = async () => {
  const redirectTo = await signOut({ redirect: false })
  redirect(redirectTo.redirect)
}
export const SignInWithGoogle = async () => {
  await signIn('google')
}
// CREATE
export async function registerUser(userSignUp: IUserSignUp) {
  try {
    const user = await UserSignUpSchema.parseAsync({
      name: userSignUp.name,
      email: userSignUp.email,
      password: userSignUp.password,
      confirmPassword: userSignUp.confirmPassword,
    })

    await connectToDatabase()
    await User.create({
      ...user,
      password: await bcrypt.hash(user.password, 5),
    })
    return { success: true, message: 'User created successfully' }
  } catch (error) {
    return { success: false, error: formatError(error) }
  }
}
 