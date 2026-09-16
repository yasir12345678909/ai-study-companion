import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { 
  User, 
  UserRole, 
  TeacherProfile, 
  TeacherVerificationStatus, 
  AcademicProfile, 
  StudentJoinRequest 
} from '@/types'

export interface ClassInfo {
  id: string
  name: string
  classLevel: number
  section: string
  joinCode: string
  representativeTeacherId: string
  representativeTeacherName: string
  representativePhone?: string
  studentCount: number
}

// Initial Mock Classes with explicit Representative Teachers
export const initialClasses: ClassInfo[] = [
  {
    id: 'cls-10a',
    name: 'Class 10-A (Science & ICS)',
    classLevel: 10,
    section: 'A',
    joinCode: 'PHY-10A',
    representativeTeacherId: 't1',
    representativeTeacherName: 'Mr. Asif Ahmed',
    representativePhone: '+92 300 5551234',
    studentCount: 32,
  },
  {
    id: 'cls-10b',
    name: 'Class 10-B (General Group)',
    classLevel: 10,
    section: 'B',
    joinCode: 'GEN-10B',
    representativeTeacherId: 't2',
    representativeTeacherName: 'Ms. Fatima Noor',
    representativePhone: '+92 301 9876543',
    studentCount: 28,
  },
]

// Mock Teacher Profiles
export const mockTeacherProfiles: TeacherProfile[] = [
  {
    id: 't1',
    name: 'Mr. Asif Ahmed',
    email: 'asif@studypilot.edu.pk',
    phone: '+92 300 5551234',
    institution: 'Islamabad Model College for Boys, F-8/4',
    verificationStatus: 'verified',
    qualifications: 'M.Sc. Physics (Quaid-i-Azam University)',
    subjects: ['Physics', 'Mathematics'],
    assignedClasses: [
      { classId: 'cls-10a', className: 'Class 10-A', section: 'A', role: 'representative' }
    ],
    submittedAt: '2025-01-10T09:00:00Z',
    verifiedAt: '2025-01-12T14:30:00Z',
  },
  {
    id: 't2',
    name: 'Ms. Fatima Noor',
    email: 'fatima@studypilot.edu.pk',
    phone: '+92 301 9876543',
    institution: 'Federal Government Girls College, G-10/4',
    verificationStatus: 'verified',
    qualifications: 'M.Phil. Chemistry (NUST)',
    subjects: ['Chemistry'],
    assignedClasses: [
      { classId: 'cls-10a', className: 'Class 10-A', section: 'A', role: 'teacher' }, // Non-rep for 10-A!
      { classId: 'cls-10b', className: 'Class 10-B', section: 'B', role: 'representative' }
    ],
    submittedAt: '2025-01-15T11:00:00Z',
    verifiedAt: '2025-01-16T10:00:00Z',
  },
  {
    id: 't3',
    name: 'Mr. Bilal Farooq',
    email: 'bilal.farooq@school.edu.pk',
    phone: '+92 321 4448899',
    institution: 'Army Public School & College, Rawalpindi',
    verificationStatus: 'pending',
    qualifications: 'BS Computer Science (FAST-NUCES), B.Ed',
    subjects: ['Computer Science'],
    assignedClasses: [],
    submittedAt: '2025-03-12T08:15:00Z',
  },
  {
    id: 't4',
    name: 'Mr. Kamran Khan',
    email: 'kamran.unverified@gmail.com',
    phone: '+92 333 1122334',
    institution: 'Independent Tutor Academy',
    verificationStatus: 'rejected',
    rejectionReason: 'Institutional verification credentials could not be authenticated with designated school authority.',
    qualifications: 'B.Sc General Science',
    subjects: ['General Science'],
    assignedClasses: [],
    submittedAt: '2025-02-28T16:45:00Z',
  },
]

// Mock Student Join Requests
export const initialJoinRequests: StudentJoinRequest[] = [
  {
    id: 'req-1',
    studentId: 'u2',
    studentName: 'Zainab Bibi',
    rollNumber: '1088',
    classId: 'cls-10a',
    className: 'Class 10-A',
    section: 'A',
    status: 'pending',
    createdAt: '2025-03-14T11:20:00Z',
  },
  {
    id: 'req-2',
    studentId: 'u3',
    studentName: 'Hamza Tariq',
    rollNumber: '1092',
    classId: 'cls-10a',
    className: 'Class 10-A',
    section: 'A',
    status: 'pending',
    createdAt: '2025-03-14T14:45:00Z',
  },
]

// Seed Users for Instant Verification & Testing
export const seedUsers: Record<string, User> = {
  'returning-student': {
    id: 'u1',
    name: 'Ahmed Khan',
    email: 'ahmed.student@fbise.edu.pk',
    role: 'student',
    class: '10',
    classLevel: 10,
    section: 'A',
    rollNumber: '1042',
    xp: 450,
    level: 5,
    onboardingCompleted: true,
    onboardingStep: 10,
    academicProfile: {
      boardId: 'fbise',
      boardName: 'Federal Board (FBISE)',
      classLevel: 10,
      streamId: 'sci-cs',
      streamName: 'Science (Computer Science Group)',
      combinationId: 'ssc-cs-std',
      combinationName: 'Standard Science with Computer Studies',
      subjects: ['English Compulsory', 'Urdu Compulsory', 'Islamiat', 'Pakistan Studies', 'Physics', 'Chemistry', 'Computer Science', 'Mathematics'],
      rollNumber: '1042',
      completedAt: '2025-01-05T12:00:00Z',
    }
  },
  'new-student': {
    id: 'u-new',
    name: 'Mustafa Ali',
    email: 'mustafa.new@gmail.com',
    role: 'student',
    xp: 0,
    level: 1,
    onboardingCompleted: false,
    onboardingStep: 0,
    academicProfile: undefined, // Requires Academic Onboarding!
  },
  'rep-teacher': {
    id: 't1',
    name: 'Mr. Asif Ahmed',
    email: 'asif@studypilot.edu.pk',
    phone: '+92 300 5551234',
    role: 'teacher',
    xp: 1500,
    level: 10,
    onboardingCompleted: true,
    onboardingStep: 10,
    teacherProfile: mockTeacherProfiles[0],
  },
  'standard-teacher': {
    id: 't2',
    name: 'Ms. Fatima Noor',
    email: 'fatima@studypilot.edu.pk',
    phone: '+92 301 9876543',
    role: 'teacher',
    xp: 900,
    level: 7,
    onboardingCompleted: true,
    onboardingStep: 10,
    teacherProfile: mockTeacherProfiles[1],
  },
  'pending-teacher': {
    id: 't3',
    name: 'Mr. Bilal Farooq',
    email: 'bilal.farooq@school.edu.pk',
    phone: '+92 321 4448899',
    role: 'teacher',
    xp: 0,
    level: 1,
    onboardingCompleted: false,
    onboardingStep: 0,
    teacherProfile: mockTeacherProfiles[2],
  },
  'rejected-teacher': {
    id: 't4',
    name: 'Mr. Kamran Khan',
    email: 'kamran.unverified@gmail.com',
    phone: '+92 333 1122334',
    role: 'teacher',
    xp: 0,
    level: 1,
    onboardingCompleted: false,
    onboardingStep: 0,
    teacherProfile: mockTeacherProfiles[3],
  },
  'management': {
    id: 'm1',
    name: 'Dr. Sarah Khan',
    email: 'principal@studypilot.edu.pk',
    role: 'management',
    xp: 5000,
    level: 25,
    onboardingCompleted: true,
    onboardingStep: 10,
  }
}

interface AuthState {
  currentUser: User
  isAuthenticated: boolean
  teacherProfiles: TeacherProfile[]
  classes: ClassInfo[]
  joinRequests: StudentJoinRequest[]
  
  // Actions
  loginAs: (presetKey: keyof typeof seedUsers) => void
  logout: () => void
  updateAcademicProfile: (profile: AcademicProfile) => void
  
  // Management Teacher Verification Workflow
  approveTeacher: (teacherId: string) => void
  rejectTeacher: (teacherId: string, reason?: string) => void
  
  // Class Membership Workflow
  submitJoinRequest: (classCode: string, studentName: string, rollNumber: string) => { success: boolean; message: string; request?: StudentJoinRequest }
  approveJoinRequest: (requestId: string) => { success: boolean; message: string }
  rejectJoinRequest: (requestId: string, reason?: string) => { success: boolean; message: string }
  
  // Authority Inspection Helper
  isRepresentativeTeacherForClass: (teacherId: string, classId: string) => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      currentUser: seedUsers['returning-student'],
      isAuthenticated: true,
      teacherProfiles: mockTeacherProfiles,
      classes: initialClasses,
      joinRequests: initialJoinRequests,

      loginAs: (presetKey) => {
        const user = seedUsers[presetKey]
        if (!user) return
        
        // Ensure teacher profile reflects the latest in store if it's a teacher
        let updatedUser = { ...user }
        if (user.role === 'teacher' && user.teacherProfile) {
          const latestProfile = get().teacherProfiles.find(t => t.id === user.teacherProfile?.id)
          if (latestProfile) {
            updatedUser.teacherProfile = latestProfile
          }
        }

        set({ currentUser: updatedUser, isAuthenticated: true })
      },

      logout: () => {
        set({
          currentUser: {
            id: 'guest',
            name: 'Guest',
            role: 'student',
            xp: 0,
            level: 1,
            onboardingCompleted: false,
            onboardingStep: 0,
          },
          isAuthenticated: false,
        })
      },

      updateAcademicProfile: (profile) => {
        set((state) => {
          const updatedUser: User = {
            ...state.currentUser,
            academicProfile: profile,
            classLevel: profile.classLevel as any,
            class: profile.classLevel.toString(),
            rollNumber: profile.rollNumber,
            onboardingCompleted: true,
          }
          return { currentUser: updatedUser }
        })
      },

      approveTeacher: (teacherId) => {
        set((state) => {
          const updatedTeachers = state.teacherProfiles.map((t) => {
            if (t.id === teacherId) {
              return {
                ...t,
                verificationStatus: 'verified' as TeacherVerificationStatus,
                verifiedAt: new Date().toISOString(),
                assignedClasses: t.assignedClasses.length > 0 ? t.assignedClasses : [
                  { classId: 'cls-10a', className: 'Class 10-A', section: 'A', role: 'teacher' as const }
                ]
              }
            }
            return t
          })

          // If current logged-in user is this teacher, update their live state immediately
          let updatedCurrentUser = state.currentUser
          if (state.currentUser.teacherProfile?.id === teacherId) {
            const freshProfile = updatedTeachers.find(t => t.id === teacherId)
            updatedCurrentUser = {
              ...state.currentUser,
              teacherProfile: freshProfile
            }
          }

          return {
            teacherProfiles: updatedTeachers,
            currentUser: updatedCurrentUser
          }
        })
      },

      rejectTeacher: (teacherId, reason = 'Application details could not be verified by management.') => {
        set((state) => {
          const updatedTeachers = state.teacherProfiles.map((t) => {
            if (t.id === teacherId) {
              return {
                ...t,
                verificationStatus: 'rejected' as TeacherVerificationStatus,
                rejectionReason: reason
              }
            }
            return t
          })

          let updatedCurrentUser = state.currentUser
          if (state.currentUser.teacherProfile?.id === teacherId) {
            const freshProfile = updatedTeachers.find(t => t.id === teacherId)
            updatedCurrentUser = {
              ...state.currentUser,
              teacherProfile: freshProfile
            }
          }

          return {
            teacherProfiles: updatedTeachers,
            currentUser: updatedCurrentUser
          }
        })
      },

      submitJoinRequest: (classCode, studentName, rollNumber) => {
        const targetClass = get().classes.find(c => c.joinCode.toLowerCase() === classCode.trim().toLowerCase())
        if (!targetClass) {
          return { success: false, message: `Class with code "${classCode}" does not exist.` }
        }

        const newRequest: StudentJoinRequest = {
          id: `req-${Date.now()}`,
          studentId: get().currentUser.id,
          studentName,
          rollNumber,
          classId: targetClass.id,
          className: targetClass.name,
          section: targetClass.section,
          status: 'pending',
          createdAt: new Date().toISOString(),
        }

        set(state => ({
          joinRequests: [newRequest, ...state.joinRequests]
        }))

        return { success: true, message: 'Join request submitted successfully.', request: newRequest }
      },

      approveJoinRequest: (requestId) => {
        const request = get().joinRequests.find(r => r.id === requestId)
        if (!request) return { success: false, message: 'Request not found.' }

        // Enforce Representative Teacher Authority check
        const currentTeacherId = get().currentUser.teacherProfile?.id
        const isRep = currentTeacherId && get().isRepresentativeTeacherForClass(currentTeacherId, request.classId)
        const isManagement = get().currentUser.role === 'management' || get().currentUser.role === 'admin'

        if (!isRep && !isManagement) {
          return { 
            success: false, 
            message: 'Permission Denied: Only the assigned Representative Teacher or Institutional Management can approve class join requests.' 
          }
        }

        set(state => ({
          joinRequests: state.joinRequests.map(r => 
            r.id === requestId 
              ? { ...r, status: 'approved', reviewedAt: new Date().toISOString(), reviewedBy: state.currentUser.name }
              : r
          ),
          classes: state.classes.map(c => 
            c.id === request.classId 
              ? { ...c, studentCount: c.studentCount + 1 }
              : c
          )
        }))

        return { success: true, message: `Approved join request for ${request.studentName} (Roll #${request.rollNumber}).` }
      },

      rejectJoinRequest: (requestId, reason = 'Roll number does not match registered class roster.') => {
        const request = get().joinRequests.find(r => r.id === requestId)
        if (!request) return { success: false, message: 'Request not found.' }

        const currentTeacherId = get().currentUser.teacherProfile?.id
        const isRep = currentTeacherId && get().isRepresentativeTeacherForClass(currentTeacherId, request.classId)
        const isManagement = get().currentUser.role === 'management' || get().currentUser.role === 'admin'

        if (!isRep && !isManagement) {
          return { 
            success: false, 
            message: 'Permission Denied: Only the assigned Representative Teacher or Institutional Management can reject class join requests.' 
          }
        }

        set(state => ({
          joinRequests: state.joinRequests.map(r => 
            r.id === requestId 
              ? { ...r, status: 'rejected', reviewedAt: new Date().toISOString(), reviewedBy: state.currentUser.name, rejectionReason: reason }
              : r
          )
        }))

        return { success: true, message: `Rejected join request for ${request.studentName}.` }
      },

      isRepresentativeTeacherForClass: (teacherId, classId) => {
        const teacher = get().teacherProfiles.find(t => t.id === teacherId)
        if (!teacher || teacher.verificationStatus !== 'verified') return false
        const assignment = teacher.assignedClasses.find(c => c.classId === classId)
        return assignment?.role === 'representative'
      }
    }),
    {
      name: 'studypilot-auth-state',
      partialize: (state) => ({
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
        teacherProfiles: state.teacherProfiles,
        classes: state.classes,
        joinRequests: state.joinRequests
      })
    }
  )
)
