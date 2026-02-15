// constants/navigation.ts
import { 
  LayoutDashboard, Users, UserCog, Stethoscope, 
  CalendarDays, FileText, CreditCard, Activity,
  Settings, ShieldAlert, History
} from "lucide-react"

export const SIDEBAR_LINKS = {
  SUPER_ADMIN: [
    { title: "Dashboard", href: "/dashboard/super-admin", icon: LayoutDashboard },
    { title: "Manage Admins", href: "/dashboard/super-admin/admins", icon: UserCog },
    { title: "System Logs", href: "/dashboard/super-admin/logs", icon: ShieldAlert },
    { title: "Settings", href: "/dashboard/super-admin/settings", icon: Settings },
  ],
  ADMIN: [
    { title: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
    { title: "Doctors", href: "/dashboard/admin/doctors", icon: Stethoscope },
    { title: "Patients", href: "/dashboard/admin/patients", icon: Users },
    { title: "Appointments", href: "/dashboard/admin/appointments", icon: CalendarDays },
    { title: "Specialties", href: "/dashboard/admin/specialties", icon: Activity },
    { title: "Payments", href: "/dashboard/admin/payments", icon: CreditCard },
  ],
  DOCTOR: [
    { title: "Dashboard", href: "/dashboard/doctor", icon: LayoutDashboard },
    { title: "My Schedule", href: "/dashboard/doctor/schedule", icon: CalendarDays },
    { title: "Appointments", href: "/dashboard/doctor/appointments", icon: History },
    { title: "Prescriptions", href: "/dashboard/doctor/prescriptions", icon: FileText },
  ],
  PATIENT: [
    { title: "Dashboard", href: "/dashboard/patient", icon: LayoutDashboard },
    { title: "Book Appointment", href: "/doctors", icon: Stethoscope },
    { title: "My Appointments", href: "/dashboard/patient/appointments", icon: CalendarDays },
    { title: "Prescriptions", href: "/dashboard/patient/prescriptions", icon: FileText },
    { title: "Medical Reports", href: "/dashboard/patient/reports", icon: Activity },
    { title: "Payments", href: "/dashboard/patient/payments", icon: CreditCard },
    { title: "Profile", href: "/dashboard/patient/profile", icon: CreditCard },
  ],
}