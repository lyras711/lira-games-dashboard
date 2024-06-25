import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

export function AuthForm({
  title,
  description,
  handleSubmit,
  isSubmitting,
  register,
  errors,
  isSignUp = false,
}) {
  return (
    <Card className="mx-auto md:max-w-sm border pb-6">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="px-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                {...register("email")}
                placeholder="your.email@example.com" 
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                {...register("password")} 
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Spinner size="medium" /> : 'Sign Up'}
            </Button>
          </form>
          {isSignUp ? (
            <p className="text-center text-sm mt-4">Already have an account? <a href="/account/signin" className="text-blue-500">Sign in</a></p>
          ) : (
            <p className="text-center text-sm mt-4">{`Don't have an account?`} <a href="/account/signup" className="text-blue-500">Sign up</a></p>
          )}
        </CardContent>
      </Card>
  )
}