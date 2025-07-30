import * as React from "react"
import { ChevronRight } from "lucide-react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"
import { getEmployeeNameById, getEmploymentTitleById } from "@/utils/firebaseUtils"

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />)
Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground",
      className
    )}
    {...props}
  />
))
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
))
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      ref={ref}
      className={cn(
        "transition-colors hover:text-foreground [&[data-current]]:text-foreground",
        className
      )}
      {...props}
    />
  )
})
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-normal text-foreground", className)}
    {...props}
  />
))
BreadcrumbPage.displayName = "BreadcrumbPage"

// Enhanced breadcrumb components for dynamic content
const DynamicBreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li"> & {
    id?: string
    type?: 'employee' | 'employment'
    fallback?: string
  }
>(({ className, id, type, fallback = 'Loading...', children, ...props }, ref) => {
  const [displayName, setDisplayName] = React.useState<string>(fallback)
  const [loading, setLoading] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (!id || !type) return

    const fetchName = async () => {
      try {
        setLoading(true)
        let name: string
        
        if (type === 'employee') {
          name = await getEmployeeNameById(id)
        } else if (type === 'employment') {
          name = await getEmploymentTitleById(id)
        } else {
          name = fallback
        }
        
        setDisplayName(name)
      } catch (error) {
        console.error(`Error fetching ${type} name:`, error)
        setDisplayName(fallback)
      } finally {
        setLoading(false)
      }
    }

    fetchName()
  }, [id, type, fallback])

  return (
    <li
      ref={ref}
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    >
      {loading ? (
        <span className="animate-pulse bg-gray-200 h-4 w-20 rounded"></span>
      ) : (
        children || displayName
      )}
    </li>
  )
})
DynamicBreadcrumbItem.displayName = "DynamicBreadcrumbItem"

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:size-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  DynamicBreadcrumbItem,
} 