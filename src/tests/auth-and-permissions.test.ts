import { describe, it, expect, beforeEach } from 'vitest'
import { useAuthStore } from '@/stores/auth-store'
import { 
  getBoards, 
  getClassesForBoard, 
  getStreamsForClass, 
  getCombinationsForStream 
} from '@/data/curriculum-config'

describe('StudyPilot Spec v2 - Identity & Verification Engine', () => {
  beforeEach(() => {
    // Reset store to fresh state before each test
    useAuthStore.setState(useAuthStore.getInitialState())
  })

  describe('1. Management Teacher Verification Workflow', () => {
    it('allows management to inspect pending teachers and approve an account', () => {
      const state = useAuthStore.getState()
      const pendingTeacher = state.teacherProfiles.find(t => t.id === 't3')
      expect(pendingTeacher).toBeDefined()
      expect(pendingTeacher?.verificationStatus).toBe('pending')

      // Management approves teacher t3
      state.approveTeacher('t3')

      const updatedState = useAuthStore.getState()
      const verifiedTeacher = updatedState.teacherProfiles.find(t => t.id === 't3')
      expect(verifiedTeacher?.verificationStatus).toBe('verified')
      expect(verifiedTeacher?.verifiedAt).toBeDefined()

      // When teacher logs in / reloads, their active profile reflects verified status
      updatedState.loginAs('pending-teacher')
      const loggedInTeacher = useAuthStore.getState().currentUser
      expect(loggedInTeacher.teacherProfile?.verificationStatus).toBe('verified')
    })

    it('allows management to reject an account with a recorded reason', () => {
      const state = useAuthStore.getState()
      const rejectionReason = 'Institutional credentials could not be verified by designated authority.'

      // Management rejects teacher t3
      state.rejectTeacher('t3', rejectionReason)

      const updatedState = useAuthStore.getState()
      const rejectedTeacher = updatedState.teacherProfiles.find(t => t.id === 't3')
      expect(rejectedTeacher?.verificationStatus).toBe('rejected')
      expect(rejectedTeacher?.rejectionReason).toBe(rejectionReason)
    })
  })

  describe('2. Permission Hierarchy: Representative vs Non-Representative Teachers', () => {
    it('allows representative teacher to approve student join requests for their assigned class', () => {
      const state = useAuthStore.getState()
      
      // t1 is Representative Teacher for cls-10a
      expect(state.isRepresentativeTeacherForClass('t1', 'cls-10a')).toBe(true)

      // Login as representative teacher
      state.loginAs('rep-teacher')

      // req-1 is pending for cls-10a
      const initialReq = state.joinRequests.find(r => r.id === 'req-1')
      expect(initialReq?.status).toBe('pending')

      const initialStudentCount = state.classes.find(c => c.id === 'cls-10a')?.studentCount || 0

      // Rep Teacher approves request
      const result = useAuthStore.getState().approveJoinRequest('req-1')
      expect(result.success).toBe(true)

      const updatedReq = useAuthStore.getState().joinRequests.find(r => r.id === 'req-1')
      expect(updatedReq?.status).toBe('approved')

      const updatedStudentCount = useAuthStore.getState().classes.find(c => c.id === 'cls-10a')?.studentCount
      expect(updatedStudentCount).toBe(initialStudentCount + 1)
    })

    it('BLOCKS verified non-representative teacher from approving class join requests', () => {
      const state = useAuthStore.getState()
      
      // t2 is Verified Teacher, but NOT representative for cls-10a
      expect(state.isRepresentativeTeacherForClass('t2', 'cls-10a')).toBe(false)

      // Login as non-representative verified teacher
      state.loginAs('standard-teacher')

      // Attempt representative-only action on cls-10a
      const result = useAuthStore.getState().approveJoinRequest('req-2')
      expect(result.success).toBe(false)
      expect(result.message).toContain('Permission Denied')

      // Request must remain pending
      const req = useAuthStore.getState().joinRequests.find(r => r.id === 'req-2')
      expect(req?.status).toBe('pending')
    })
  })

  describe('3. Dynamic Curriculum Configuration (No Hardcoded Combinations)', () => {
    it('dynamically derives classes and streams for Federal Board', () => {
      const boards = getBoards()
      expect(boards.length).toBeGreaterThan(0)
      
      const fbise = boards.find(b => b.id === 'fbise')
      expect(fbise).toBeDefined()

      const classes = getClassesForBoard('fbise')
      expect(classes.map(c => c.level)).toEqual([9, 10, 11, 12])
    })

    it('provides multiple valid elective combinations for ICS without modifying UI code', () => {
      // Class 11 ICS on Federal Board
      const streams = getStreamsForClass('fbise', 11)
      const icsStream = streams.find(s => s.id === 'ics')
      expect(icsStream).toBeDefined()

      const combinations = getCombinationsForStream('fbise', 11, 'ics')
      expect(combinations.length).toBe(3)
      
      const combinationCodes = combinations.map(c => c.id)
      expect(combinationCodes).toContain('ics-physics')
      expect(combinationCodes).toContain('ics-stats')
      expect(combinationCodes).toContain('ics-econ')

      // Verify Physics combination contains Math, CS, and Physics
      const physicsGroup = combinations.find(c => c.id === 'ics-physics')
      const subjectCodes = physicsGroup?.subjects.map(s => s.code)
      expect(subjectCodes).toContain('MATH')
      expect(subjectCodes).toContain('CS')
      expect(subjectCodes).toContain('PHY')
    })
  })

  describe('4. Student Class Join Link Workflow', () => {
    it('creates a pending join request when student submits class join code', () => {
      const state = useAuthStore.getState()
      state.loginAs('new-student')

      const result = state.submitJoinRequest('PHY-10A', 'Mustafa Ali', '1105')
      expect(result.success).toBe(true)
      expect(result.request?.status).toBe('pending')
      expect(result.request?.studentName).toBe('Mustafa Ali')
      expect(result.request?.rollNumber).toBe('1105')
    })
  })
})
