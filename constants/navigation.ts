// constants/navigation.ts
import { 
  LayoutDashboard, Users, UserCog, Stethoscope, 
  CalendarDays, FileText, CreditCard, Activity,
  Settings, ShieldAlert, History, UserCircle
} from "lucide-react"

export const SIDEBAR_LINKS = {
  ADMIN: [
    { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { title: "Doctors", href: "/admin/dashboard/doctors", icon: Stethoscope },
    { title: "Patients", href: "/admin/dashboard/patients", icon: Users },
    { title: "Appointments", href: "/admin/dashboard/appointments", icon: CalendarDays },
    { title: "Specialties", href: "/admin/dashboard/specialties", icon: Activity },
    { title: "System Logs", href: "/admin/dashboard/logs", icon: ShieldAlert },
    { title: "Payments", href: "/admin/dashboard/payments", icon: CreditCard },
  ],
  DOCTOR: [
    { title: "Dashboard", href: "/doctor/dashboard", icon: LayoutDashboard },
    { title: "My Schedule", href: "/doctor/dashboard/schedule", icon: CalendarDays },
    { title: "Appointments", href: "/doctor/dashboard/appointments", icon: History },
    { title: "Prescriptions", href: "/doctor/dashboard/prescriptions", icon: FileText },
  ],
  PATIENT: [
    { title: "Dashboard", href: "/patient/dashboard", icon: LayoutDashboard },
    { title: "My Appointments", href: "/patient/dashboard/appointments", icon: CalendarDays },
    { title: "Prescriptions", href: "/patient/dashboard/prescriptions", icon: FileText },
    { title: "Medical Reports", href: "/patient/dashboard/reports", icon: Activity },
    { title: "Payments", href: "/patient/dashboard/payments", icon: CreditCard },
    { title: "Profile", href: "/patient/dashboard/profile", icon: UserCircle },
    { title: "Settings", href: "/patient/dashboard/settings", icon: Settings },

  ],
}