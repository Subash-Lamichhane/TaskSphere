import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

export default function About() {
    return (
        <>  
        <div className="flex flex-col justify-between min-h-screen">
            <Navbar />
            <div className="container mx-auto px-4 py-12 md:py-24 ">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Task Tracker for Teams</h1>
                    <p className="text-xl text-muted-foreground">
                        A task management system designed for team collaboration where tasks can be assigned, tracked, and managed
                        based on user roles.
                    </p>
                </div>
                <div className="mt-12 md:mt-16 grid gap-8 md:grid-cols-3">
                    <div className="bg-muted rounded-lg p-6 space-y-4 bg-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary rounded-full p-2 text-primary-foreground">
                                <ServerIcon className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-semibold">Admin</h3>
                        </div>
                        <p className="text-muted-foreground">Can create, read, and delete all tasks and manage all users.</p>
                    </div>
                    <div className="bg-muted rounded-lg p-6 space-y-4 bg-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="bg-secondary rounded-full p-2 text-secondary-foreground">
                                <MonitorIcon className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-semibold">Manager</h3>
                        </div>
                        <p className="text-muted-foreground">
                            Can create, read, and delete tasks assigned to their team and manage team members.
                        </p>
                    </div>
                    <div className="bg-muted rounded-lg p-6 space-y-4 bg-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="bg-accent rounded-full p-2 text-accent-foreground">
                                <UserIcon className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-semibold">Employee</h3>
                        </div>
                        <p className="text-muted-foreground">Can view, create and update tasks assigned to them.</p>
                    </div>
                </div>
                <p className="text-xl text-muted-foreground  text-center mt-10 bg-gray-100 px-10 rounded-xl py-4">
                        The assigned permissions can be easily changes with permit.io and these changes are reflected in real time.
                    </p>
            </div>
            <Footer/>

        </div>
        </>
    )
}

function MonitorIcon(props) {
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
            <rect width="20" height="14" x="2" y="3" rx="2" />
            <line x1="8" x2="16" y1="21" y2="21" />
            <line x1="12" x2="12" y1="17" y2="21" />
        </svg>
    )
}


function ServerIcon(props) {
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
            <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
            <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
            <line x1="6" x2="6.01" y1="6" y2="6" />
            <line x1="6" x2="6.01" y1="18" y2="18" />
        </svg>
    )
}


function UserIcon(props) {
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
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    )
}