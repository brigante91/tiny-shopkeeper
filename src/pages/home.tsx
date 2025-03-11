import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export function HomePage() {
  const { toast } = useToast()

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome Home</h1>
      <p className="text-muted-foreground">
        This is a demo application built with React, Vite, and shadcn/ui.
      </p>
      <Button 
        onClick={() => {
          toast({
            title: "Hello!",
            description: "This is a toast notification",
          })
        }}
      >
        Show Toast
      </Button>
    </div>
  )
} 