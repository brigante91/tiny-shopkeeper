import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export function NotFoundPage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-2 text-lg text-muted-foreground">
        Page not found
      </p>
      <Button asChild className="mt-4">
        <Link to="/">Go back home</Link>
      </Button>
    </div>
  )
} 