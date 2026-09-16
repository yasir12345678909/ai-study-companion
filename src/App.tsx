import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

// Layout
import { AppShell } from '@/components/layout/app-shell'

// Eager-load the most critical pages
import { HomePage } from '@/features/home/home-page'
import { SubjectsPage } from '@/features/subjects/subjects-page'

// Lazy-load everything else for performance
const SubjectOverviewPage = lazy(() =>
  import('@/features/subjects/subject-overview-page').then((m) => ({ default: m.SubjectOverviewPage }))
)
const ChapterOverviewPage = lazy(() =>
  import('@/features/subjects/chapter-overview-page').then((m) => ({ default: m.ChapterOverviewPage }))
)
const TutorPage = lazy(() =>
  import('@/features/tutor/tutor-page').then((m) => ({ default: m.TutorPage }))
)
const MaterialsPage = lazy(() =>
  import('@/features/materials/materials-page').then((m) => ({ default: m.MaterialsPage }))
)
const UploadFlow = lazy(() =>
  import('@/features/materials/upload-flow').then((m) => ({ default: m.UploadFlow }))
)
const QuestionDetailPage = lazy(() =>
  import('@/features/questions/question-detail-page').then((m) => ({ default: m.QuestionDetailPage }))
)
const QuickRevisionPage = lazy(() =>
  import('@/features/revision/quick-revision-page').then((m) => ({ default: m.QuickRevisionPage }))
)
const PastPapersPage = lazy(() =>
  import('@/features/exams/past-papers-page').then((m) => ({ default: m.PastPapersPage }))
)
const FlowchartPage = lazy(() =>
  import('@/features/flowchart/flowchart-page').then((m) => ({ default: m.FlowchartPage }))
)
const HandwrittenPage = lazy(() =>
  import('@/features/handwritten/handwritten-page').then((m) => ({ default: m.HandwrittenPage }))
)
const GroupsPage = lazy(() =>
  import('@/features/groups/groups-page').then((m) => ({ default: m.GroupsPage }))
)
const GroupDetailPage = lazy(() =>
  import('@/features/groups/group-detail-page').then((m) => ({ default: m.GroupDetailPage }))
)
const HistoryPage = lazy(() =>
  import('@/features/history/history-page').then((m) => ({ default: m.HistoryPage }))
)
const TeacherDashboardPage = lazy(() =>
  import('@/features/teacher/teacher-dashboard-page').then((m) => ({ default: m.TeacherDashboardPage }))
)
const AdminDashboardPage = lazy(() =>
  import('@/features/admin/admin-dashboard-page').then((m) => ({ default: m.AdminDashboardPage }))
)
const StudyPlannerPage = lazy(() =>
  import('@/features/planner/study-planner-page').then((m) => ({ default: m.StudyPlannerPage }))
)
const SettingsPage = lazy(() =>
  import('@/features/settings/settings-page').then((m) => ({ default: m.SettingsPage }))
)
const ProfilePage = lazy(() =>
  import('@/features/profile/profile-page').then((m) => ({ default: m.ProfilePage }))
)
const MaterialDetailPage = lazy(() =>
  import('@/features/materials/material-detail-page').then((m) => ({ default: m.MaterialDetailPage }))
)
const TopicConceptPage = lazy(() =>
  import('@/features/subjects/topic-concept-page').then((m) => ({ default: m.TopicConceptPage }))
)
const TeacherReviewPage = lazy(() =>
  import('@/features/teacher/teacher-review-page').then((m) => ({ default: m.TeacherReviewPage }))
)
const WritingPracticePage = lazy(() =>
  import('@/features/languages/writing-practice-page').then((m) => ({ default: m.WritingPracticePage }))
)
const OnboardingPage = lazy(() =>
  import('@/features/onboarding/onboarding-page').then((m) => ({ default: m.OnboardingPage }))
)
const LoginPage = lazy(() =>
  import('@/features/auth/login-page').then((m) => ({ default: m.LoginPage }))
)
const AcademicProfileFlow = lazy(() =>
  import('@/features/onboarding/academic-profile-flow').then((m) => ({ default: m.AcademicProfileFlow }))
)
const JoinClassPage = lazy(() =>
  import('@/features/classes/join-class-page').then((m) => ({ default: m.JoinClassPage }))
)

import { RoleGuard } from '@/components/auth/role-guard'

function PageLoader() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-surface-400 border-t-brand-500" />
        <p className="text-sm text-surface-600">Loading...</p>
      </div>
    </div>
  )
}

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>
}

const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <SuspenseWrapper>
        <LoginPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/onboarding/academic',
    element: (
      <SuspenseWrapper>
        <AcademicProfileFlow />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/join/:classCode',
    element: (
      <SuspenseWrapper>
        <JoinClassPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/onboarding',
    element: (
      <SuspenseWrapper>
        <OnboardingPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: 'home', element: <HomePage /> },
      { path: 'subjects', element: <SubjectsPage /> },
      {
        path: 'subjects/:subjectId',
        element: (
          <SuspenseWrapper>
            <SubjectOverviewPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'subjects/:subjectId/:chapterId',
        element: (
          <SuspenseWrapper>
            <ChapterOverviewPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'subjects/:subjectId/:chapterId/questions',
        element: (
          <SuspenseWrapper>
            <ChapterOverviewPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'subjects/:subjectId/:chapterId/flowchart',
        element: (
          <SuspenseWrapper>
            <FlowchartPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'questions/:questionId',
        element: (
          <SuspenseWrapper>
            <QuestionDetailPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'tutor',
        element: (
          <SuspenseWrapper>
            <TutorPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'materials',
        element: (
          <SuspenseWrapper>
            <MaterialsPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'materials/upload',
        element: (
          <SuspenseWrapper>
            <UploadFlow />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'groups',
        element: (
          <SuspenseWrapper>
            <GroupsPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'groups/:groupId',
        element: (
          <SuspenseWrapper>
            <GroupDetailPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'history',
        element: (
          <SuspenseWrapper>
            <HistoryPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'revision',
        element: (
          <SuspenseWrapper>
            <QuickRevisionPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'handwritten',
        element: (
          <SuspenseWrapper>
            <HandwrittenPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'exams',
        element: (
          <SuspenseWrapper>
            <PastPapersPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'planner',
        element: (
          <SuspenseWrapper>
            <StudyPlannerPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'teacher',
        element: (
          <SuspenseWrapper>
            <RoleGuard allowedRoles={['teacher']}>
              <TeacherDashboardPage />
            </RoleGuard>
          </SuspenseWrapper>
        ),
      },
      {
        path: 'admin',
        element: (
          <SuspenseWrapper>
            <RoleGuard allowedRoles={['management', 'admin']}>
              <AdminDashboardPage />
            </RoleGuard>
          </SuspenseWrapper>
        ),
      },
      {
        path: 'materials/:id',
        element: (
          <SuspenseWrapper>
            <MaterialDetailPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'subjects/:subjectId/:chapterId/concepts',
        element: (
          <SuspenseWrapper>
            <TopicConceptPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'teacher/review',
        element: (
          <SuspenseWrapper>
            <RoleGuard allowedRoles={['teacher']}>
              <TeacherReviewPage />
            </RoleGuard>
          </SuspenseWrapper>
        ),
      },
      {
        path: 'writing',
        element: (
          <SuspenseWrapper>
            <WritingPracticePage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'profile',
        element: (
          <SuspenseWrapper>
            <ProfilePage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'settings',
        element: (
          <SuspenseWrapper>
            <SettingsPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '*',
        element: <Navigate to="/home" replace />,
      },
    ],
    errorElement: (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-surface-50 p-6 text-center text-surface-900">
        <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
        <p className="text-surface-600 mb-6 max-w-md">
          The study section or resource you requested could not be located.
        </p>
        <a
          href="/home"
          className="rounded-lg bg-brand-600 px-5 py-2.5 font-medium text-white transition hover:bg-brand-500"
        >
          Return to Study Workspace
        </a>
      </div>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/home" replace />,
  },
])

export function App() {
  return <RouterProvider router={router} />
}
