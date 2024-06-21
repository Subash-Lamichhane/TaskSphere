/**
 * v0 by Vercel.
 * @see https://v0.dev/t/v4oJYZlvscS
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Link } from "react-router-dom"
import taskImage from '../assets/images/task2.png'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import FAQ from "../components/FAQ"
function HeroSection() {
  return (
    <div className="bg-[#bba8ff]  w-full min-h-screen">
      <section className="container mx-auto px-4 md:px-6 py-12 md:py-24 lg:py-32">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Streamline Your Team's Productivity
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Effortlessly manage tasks, track progress, and collaborate with your team using our powerful Task Tracker
              system.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                to='/dashboard'
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-black text-white"
                
              >
                Get Started
              </Link>
              <Link
                to='/dashboard'
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-white"
                
              >
                Learn More
              </Link>
            </div>
          </div>
          <img
            src={taskImage}

          />
        </div>
      </section>
    </div>
  )
}

export default function Component() {
  return (
    <>
    <Navbar/>
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        {/* <a href="#" className="flex items-center justify-center">
          <CalendarIcon className="h-6 
          <span className="sr-only">Event Management System</span>
        </a> */}
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <a href="#" className="text-sm font-medium hover:underline underline-offset-4">
            Features
          </a>
          <a href="#" className="text-sm font-medium hover:underline underline-offset-4">
            Pricing
          </a>
          <a href="#" className="text-sm font-medium hover:underline underline-offset-4">
            About
          </a>
          <a href="#" className="text-sm font-medium hover:underline underline-offset-4">
            Contact
          </a>
        </nav>
      </header>
      <main className="flex-1">
      <HeroSection/>
      <div className="w-full bg-gray-100">
      <section className="container mx-auto px-4 md:px-6 py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm bg-gray-200">New Features</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Faster iteration. More innovation.</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              The platform for rapid progress. Let your team focus on shipping features instead of managing
              infrastructure with automated CI/CD, built-in testing, and integrated collaboration.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl divide-y divide-border rounded-lg border md:grid-cols-3 md:divide-x md:divide-y-0">
          <div className="grid gap-1 p-8 md:p-10">
            <h3 className="text-xl font-bold">Collaboration</h3>
            <p className="text-muted-foreground">Make collaboration seamless with built-in code review tools.</p>
          </div>
          <div className="grid gap-1 p-8 md:p-10">
            <h3 className="text-xl font-bold">Automation</h3>
            <p className="text-muted-foreground">Automate your workflow with continuous integration.</p>
          </div>
          <div className="grid gap-1 p-8 md:p-10">
            <h3 className="text-xl font-bold">Scale</h3>
            <p className="text-muted-foreground">Deploy to the cloud with a single click and scale with ease.</p>
          </div>
        </div>
      </section>

      </div>
      <FAQ/>
      </main>
    <Footer/>
    </div>
    </>
  )
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}
