import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  BookOpen, 
  Clock, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Plus, 
  LayoutDashboard, 
  ChevronRight, 
  AlertTriangle,
  AlertCircle,
  ShieldAlert,
  UserCheck,
  UserX,
  Lock,
  Sparkles,
  Check,
  X
} from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface PendingMaterial {
  id: string;
  name: string;
  uploadedBy: string;
  subject: string;
  date: string;
  status: 'pending' | 'verified' | 'rejected';
}

const initialMaterials: PendingMaterial[] = [
  { id: '1', name: 'Chapter 3 Physics Notes', uploadedBy: 'Ali Khan', subject: 'Physics', date: '2026-09-15', status: 'pending' },
  { id: '2', name: 'Math Past Paper Solutions', uploadedBy: 'Sara Ahmed', subject: 'Math', date: '2026-09-14', status: 'pending' },
  { id: '3', name: 'Chemistry Summary', uploadedBy: 'Zainab Raza', subject: 'Chemistry', date: '2026-09-13', status: 'pending' },
];

export function TeacherDashboardPage() {
  const navigate = useNavigate();
  const { 
    currentUser, 
    classes, 
    joinRequests, 
    approveJoinRequest, 
    rejectJoinRequest, 
    isRepresentativeTeacherForClass 
  } = useAuthStore();

  const teacherProfile = currentUser.teacherProfile;
  const verificationStatus = teacherProfile?.verificationStatus || 'verified';
  const isPending = verificationStatus === 'pending';
  const isRejected = verificationStatus === 'rejected';
  const isVerified = verificationStatus === 'verified';

  // Default to Class 10-A
  const [selectedClassId, setSelectedClassId] = useState('cls-10a');
  const selectedClass = classes.find(c => c.id === selectedClassId) || classes[0];

  // Representative Teacher Check for the selected class
  const isRepTeacher = isVerified && teacherProfile && isRepresentativeTeacherForClass(teacherProfile.id, selectedClass.id);

  const [materials, setMaterials] = useState<PendingMaterial[]>(initialMaterials);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  const handleMaterialAction = (id: string, action: 'verified' | 'rejected') => {
    if (!isVerified) {
      showToast('Action Blocked: Account verification by management is required.');
      return;
    }
    setMaterials(prev =>
      prev.map(m => (m.id === id ? { ...m, status: action } : m))
    );
  };

  const handleApproveStudent = (requestId: string) => {
    const res = approveJoinRequest(requestId);
    showToast(res.message);
  };

  const handleRejectStudent = (requestId: string) => {
    const res = rejectJoinRequest(requestId, 'Roster verification did not match institutional records.');
    showToast(res.message);
  };

  const pendingMaterialsCount = materials.filter(m => m.status === 'pending').length;
  const classJoinRequests = joinRequests.filter(r => r.classId === selectedClass.id);
  const pendingJoinRequests = classJoinRequests.filter(r => r.status === 'pending');

  return (
    <div className="flex-1 p-4 md:p-8 lg:p-10 bg-surface-950 text-surface-50 overflow-y-auto font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header with Role Identity */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-800 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-surface-0">Teacher Workspace</h1>
              <span className={cn(
                "px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                isVerified && "bg-success/15 text-success border border-success/30",
                isPending && "bg-warning/15 text-warning border border-warning/30",
                isRejected && "bg-danger/15 text-danger border border-danger/30"
              )}>
                {verificationStatus}
              </span>
              {isRepTeacher && (
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-brand-500/20 text-brand-300 border border-brand-500/40">
                  Representative Teacher
                </span>
              )}
            </div>
            <p className="text-surface-400 mt-1 text-sm md:text-base">
              Logged in as <strong className="text-surface-200">{currentUser.name}</strong> • {teacherProfile?.institution || 'Academic Faculty'}
            </p>
          </div>

          {/* Class Switcher */}
          <div className="flex items-center gap-2 bg-surface-900 border border-surface-800 p-1.5 rounded-xl">
            <span className="text-xs font-semibold text-surface-400 pl-2">Class:</span>
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="bg-surface-950 border border-surface-700 text-surface-100 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-brand-500"
            >
              {classes.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.joinCode})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Feedback Banner */}
        <AnimatePresence>
          {feedbackMessage && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="p-3.5 rounded-xl bg-brand-500/20 border border-brand-500/40 text-brand-200 text-sm flex items-center gap-2.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 shrink-0 text-brand-400" />
              <span>{feedbackMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── MANDATORY STATE: PENDING VERIFICATION BANNER ── */}
        {isPending && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-2xl bg-warning/10 border-2 border-warning/30 text-surface-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg"
          >
            <div className="flex items-start gap-3.5">
              <AlertTriangle className="w-6 h-6 text-warning shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h3 className="font-bold text-base text-warning">Account Pending Management Verification</h3>
                <p className="text-sm text-surface-300 leading-relaxed">
                  Your academic credentials have been submitted and are currently in the Institutional Management verification queue. 
                  Privileged capabilities (approving student materials, publishing class AI notes, and class membership controls) are disabled in read-only mode until an administrator verifies your account.
                </p>
              </div>
            </div>
            <span className="px-3 py-1.5 rounded-lg bg-surface-900 border border-surface-750 text-xs font-semibold text-surface-400 whitespace-nowrap">
              Read-Only Mode
            </span>
          </motion.div>
        )}

        {/* ── MANDATORY STATE: REJECTED BANNER ── */}
        {isRejected && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-2xl bg-danger/10 border-2 border-danger/30 text-surface-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg"
          >
            <div className="flex items-start gap-3.5">
              <AlertCircle className="w-6 h-6 text-danger shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h3 className="font-bold text-base text-danger">Verification Application Rejected</h3>
                <p className="text-sm text-surface-300 leading-relaxed">
                  {teacherProfile?.rejectionReason || 'Institutional credentials could not be verified by designated authority.'}
                </p>
                <p className="text-xs text-surface-400">
                  Please contact institutional management or your representative teacher to appeal or re-submit verification documentation.
                </p>
              </div>
            </div>
            <span className="px-3 py-1.5 rounded-lg bg-surface-900 border border-surface-750 text-xs font-semibold text-danger whitespace-nowrap">
              Privileges Disabled
            </span>
          </motion.div>
        )}

        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Active Classes', value: classes.length, icon: LayoutDashboard, color: 'text-brand-400' },
            { label: 'Enrolled Students', value: selectedClass.studentCount, icon: Users, color: 'text-success' },
            { label: 'Pending Join Requests', value: pendingJoinRequests.length, icon: UserCheck, color: 'text-warning' },
            { label: 'Material Reviews', value: pendingMaterialsCount, icon: BookOpen, color: 'text-info' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-surface-900 border border-surface-800 rounded-2xl p-5 flex items-center space-x-4 shadow-sm"
            >
              <div className={cn("p-3 rounded-xl bg-surface-800/80", stat.color)}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-surface-400 text-xs font-semibold uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-bold text-surface-0 mt-0.5">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── SECTION: STUDENT JOIN REQUESTS (REPRESENTATIVE TEACHER WORKFLOW) ── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-surface-0 flex items-center gap-2">
                <Users className="w-5 h-5 text-brand-400" />
                Class Membership & Student Join Requests
              </h2>
              <p className="text-xs text-surface-400 mt-0.5">
                Join link: <code className="bg-surface-900 px-1.5 py-0.5 rounded text-brand-300 font-mono">/join/{selectedClass.joinCode}</code>
              </p>
            </div>

            {/* Representative Authority Badge */}
            {isRepTeacher ? (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/15 text-brand-300 border border-brand-500/30 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-brand-400" />
                Representative Teacher Authority Active
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-surface-900 text-surface-400 border border-surface-800 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-surface-500" />
                Rep Authority: {selectedClass.representativeTeacherName}
              </span>
            )}
          </div>

          <div className="bg-surface-900 border border-surface-800 rounded-2xl overflow-hidden shadow-sm">
            {classJoinRequests.length === 0 ? (
              <div className="p-8 text-center text-surface-400 text-sm">
                No join requests recorded for {selectedClass.name}.
              </div>
            ) : (
              <div className="divide-y divide-surface-800">
                {classJoinRequests.map((req) => (
                  <div key={req.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-surface-850/50 transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-surface-100">{req.studentName}</span>
                        <span className="px-2 py-0.5 rounded text-xs font-mono bg-surface-800 text-surface-300">
                          Roll #{req.rollNumber}
                        </span>
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-[11px] font-semibold capitalize",
                          req.status === 'pending' && "bg-warning/15 text-warning border border-warning/30",
                          req.status === 'approved' && "bg-success/15 text-success border border-success/30",
                          req.status === 'rejected' && "bg-danger/15 text-danger border border-danger/30"
                        )}>
                          {req.status}
                        </span>
                      </div>
                      <p className="text-xs text-surface-400">
                        Requested {new Date(req.createdAt).toLocaleDateString()} for {req.className} (Sec {req.section})
                        {req.reviewedBy && ` • Reviewed by ${req.reviewedBy}`}
                      </p>
                      {req.rejectionReason && (
                        <p className="text-xs text-danger font-medium">Rejection note: {req.rejectionReason}</p>
                      )}
                    </div>

                    {/* Join Actions: ONLY Representative Teacher can trigger */}
                    {req.status === 'pending' && (
                      <div className="flex items-center gap-2 shrink-0">
                        {isRepTeacher ? (
                          <>
                            <button
                              onClick={() => handleApproveStudent(req.id)}
                              className="px-3.5 py-1.5 rounded-lg bg-success hover:bg-success/90 text-surface-950 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
                            >
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                              Approve Student
                            </button>
                            <button
                              onClick={() => handleRejectStudent(req.id)}
                              className="px-3 py-1.5 rounded-lg bg-danger/10 hover:bg-danger/20 text-danger border border-danger/30 text-xs font-semibold transition-colors flex items-center gap-1.5"
                            >
                              <X className="w-3.5 h-3.5 stroke-[2.5]" />
                              Reject
                            </button>
                          </>
                        ) : (
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-950 border border-surface-800 text-surface-500 text-xs">
                            <Lock className="w-3.5 h-3.5" />
                            <span>Rep Approval Required</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── SECTION: PENDING MATERIAL REVIEWS ── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-surface-0 flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-400" />
              Student Notes & Material Verification
            </h2>
            <button
              onClick={() => navigate('/teacher/review')}
              disabled={!isVerified}
              className={cn(
                "text-xs font-semibold transition-colors",
                isVerified ? "text-brand-400 hover:text-brand-300" : "text-surface-600 cursor-not-allowed"
              )}
            >
              Open Full Verification Queue →
            </button>
          </div>

          <div className="bg-surface-900 border border-surface-800 rounded-2xl overflow-hidden shadow-sm">
            <ul className="divide-y divide-surface-800">
              {materials.map(material => (
                <li
                  key={material.id}
                  className={cn(
                    "p-4 transition-colors",
                    material.status !== 'pending' && "bg-surface-850/30"
                  )}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-surface-100">{material.name}</h3>
                      <p className="text-xs text-surface-400 mt-1">
                        {material.subject} • Submitted by <span className="text-surface-300 font-medium">{material.uploadedBy}</span> • {material.date}
                      </p>
                    </div>
                    
                    {material.status === 'pending' ? (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleMaterialAction(material.id, 'verified')}
                          disabled={!isVerified}
                          className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors",
                            isVerified 
                              ? "text-success bg-success/10 hover:bg-success/20 border border-success/30" 
                              : "text-surface-500 bg-surface-800 cursor-not-allowed border border-surface-700"
                          )}
                          title={!isVerified ? "Verification required to approve" : undefined}
                        >
                          {!isVerified ? <Lock className="w-3.5 h-3.5" /> : <CheckCircle className="w-3.5 h-3.5" />}
                          Approve for Class AI
                        </button>
                        <button
                          onClick={() => handleMaterialAction(material.id, 'rejected')}
                          disabled={!isVerified}
                          className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors",
                            isVerified 
                              ? "text-danger bg-danger/10 hover:bg-danger/20 border border-danger/30" 
                              : "text-surface-500 bg-surface-800 cursor-not-allowed border border-surface-700"
                          )}
                          title={!isVerified ? "Verification required to reject" : undefined}
                        >
                          {!isVerified ? <Lock className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className={cn(
                        "flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border",
                        material.status === 'verified' 
                          ? "text-success bg-success/10 border-success/30" 
                          : "text-danger bg-danger/10 border-danger/30"
                      )}>
                        {material.status === 'verified' ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                        {material.status === 'verified' ? 'Approved for Class AI' : 'Rejected'}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── SECTION: QUICK ACTIONS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => isVerified && navigate('/materials/upload')}
            disabled={!isVerified}
            className={cn(
              "p-4 rounded-2xl border text-left transition-all flex items-center justify-between group",
              isVerified 
                ? "bg-surface-900 border-surface-800 hover:border-brand-500/50 hover:bg-surface-850" 
                : "bg-surface-900/50 border-surface-800/60 opacity-60 cursor-not-allowed"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-brand-500/10 text-brand-400">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm text-surface-100">Upload Class Material</p>
                <p className="text-xs text-surface-400">Add trusted notes for Class AI</p>
              </div>
            </div>
            {!isVerified ? <Lock className="w-4 h-4 text-surface-500" /> : <ChevronRight className="w-4 h-4 text-surface-500 group-hover:text-surface-300" />}
          </button>

          <button
            onClick={() => isVerified && navigate('/exams')}
            disabled={!isVerified}
            className={cn(
              "p-4 rounded-2xl border text-left transition-all flex items-center justify-between group",
              isVerified 
                ? "bg-surface-900 border-surface-800 hover:border-brand-500/50 hover:bg-surface-850" 
                : "bg-surface-900/50 border-surface-800/60 opacity-60 cursor-not-allowed"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-warning/10 text-warning">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm text-surface-100">Create Class Test</p>
                <p className="text-xs text-surface-400">Timed assessment from past papers</p>
              </div>
            </div>
            {!isVerified ? <Lock className="w-4 h-4 text-surface-500" /> : <ChevronRight className="w-4 h-4 text-surface-500 group-hover:text-surface-300" />}
          </button>

          <button
            onClick={() => isRepTeacher && navigate(`/groups/${selectedClass.id}`)}
            disabled={!isRepTeacher}
            className={cn(
              "p-4 rounded-2xl border text-left transition-all flex items-center justify-between group",
              isRepTeacher 
                ? "bg-surface-900 border-surface-800 hover:border-brand-500/50 hover:bg-surface-850" 
                : "bg-surface-900/50 border-surface-800/60 opacity-60 cursor-not-allowed"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-success/10 text-success">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm text-surface-100">Manage Class Roster</p>
                <p className="text-xs text-surface-400">
                  {isRepTeacher ? 'Add/remove students' : 'Rep Teacher authority required'}
                </p>
              </div>
            </div>
            {!isRepTeacher ? <Lock className="w-4 h-4 text-surface-500" /> : <ChevronRight className="w-4 h-4 text-surface-500 group-hover:text-surface-300" />}
          </button>
        </div>

      </div>
    </div>
  );
}
