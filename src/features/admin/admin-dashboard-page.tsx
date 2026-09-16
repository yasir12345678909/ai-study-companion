import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  BookOpen, 
  Users, 
  Database, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Clock, 
  Phone, 
  Mail, 
  GraduationCap, 
  ChevronRight, 
  ArrowDown, 
  Search,
  Check,
  X,
  Eye,
  Building
} from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';
import type { TeacherProfile } from '@/types';
import { cn } from '@/lib/utils';
import { pakistanBoards } from '@/data/curriculum-config';

export function AdminDashboardPage() {
  const { 
    teacherProfiles, 
    approveTeacher, 
    rejectTeacher, 
    classes 
  } = useAuthStore();

  const [activeTab, setActiveTab] = useState<'verification' | 'curriculum' | 'materials'>('verification');
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherProfile | null>(null);
  const [rejectModalTeacher, setRejectModalTeacher] = useState<TeacherProfile | null>(null);
  const [rejectReason, setRejectReason] = useState('Institution credentials could not be verified by institutional management.');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'verified' | 'rejected'>('pending');
  const [feedbackNotice, setFeedbackNotice] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setFeedbackNotice(msg);
    setTimeout(() => setFeedbackNotice(null), 4000);
  };

  const handleApprove = (teacher: TeacherProfile) => {
    approveTeacher(teacher.id);
    showNotification(`Approved ${teacher.name}. Teacher privileges unlocked.`);
    if (selectedTeacher?.id === teacher.id) {
      setSelectedTeacher({ ...teacher, verificationStatus: 'verified' });
    }
  };

  const handleRejectConfirm = () => {
    if (!rejectModalTeacher) return;
    rejectTeacher(rejectModalTeacher.id, rejectReason);
    showNotification(`Application rejected for ${rejectModalTeacher.name}.`);
    if (selectedTeacher?.id === rejectModalTeacher.id) {
      setSelectedTeacher({ ...rejectModalTeacher, verificationStatus: 'rejected', rejectionReason: rejectReason });
    }
    setRejectModalTeacher(null);
  };

  const pendingCount = teacherProfiles.filter(t => t.verificationStatus === 'pending').length;
  const verifiedCount = teacherProfiles.filter(t => t.verificationStatus === 'verified').length;
  const rejectedCount = teacherProfiles.filter(t => t.verificationStatus === 'rejected').length;

  const filteredTeachers = teacherProfiles.filter(t => {
    if (statusFilter === 'all') return true;
    return t.verificationStatus === statusFilter;
  });

  return (
    <div className="flex-1 p-4 md:p-8 bg-surface-950 text-surface-50 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header with Notification */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-surface-0 flex items-center gap-3">
              <Shield className="w-8 h-8 text-brand-500" />
              Institutional Management
            </h1>
            <p className="text-surface-400 mt-1 text-sm md:text-base">
              Faculty verification, class allocation, and Pakistan curriculum governance.
            </p>
          </div>
          
          <div className="flex items-center gap-2 bg-surface-900 border border-surface-800 p-1.5 rounded-lg text-sm">
            <button
              onClick={() => setActiveTab('verification')}
              className={cn(
                "px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-2",
                activeTab === 'verification' ? "bg-brand-600 text-white shadow-sm" : "text-surface-400 hover:text-surface-100"
              )}
            >
              <Users className="w-4 h-4" />
              Faculty Verification
              {pendingCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-xs font-bold bg-warning text-surface-950">
                  {pendingCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('curriculum')}
              className={cn(
                "px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-2",
                activeTab === 'curriculum' ? "bg-brand-600 text-white shadow-sm" : "text-surface-400 hover:text-surface-100"
              )}
            >
              <BookOpen className="w-4 h-4" />
              Curricula & Boards
            </button>
            <button
              onClick={() => setActiveTab('materials')}
              className={cn(
                "px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-2",
                activeTab === 'materials' ? "bg-brand-600 text-white shadow-sm" : "text-surface-400 hover:text-surface-100"
              )}
            >
              <Database className="w-4 h-4" />
              Official Syllabi
            </button>
          </div>
        </div>

        {/* Feedback Alert Toast */}
        <AnimatePresence>
          {feedbackNotice && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-xl bg-success/15 border border-success/30 text-success flex items-center gap-3 shadow-lg"
            >
              <CheckCircle className="w-5 h-5 shrink-0" />
              <span className="font-medium text-sm">{feedbackNotice}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── TAB 1: Faculty Verification & Approvals ── */}
        {activeTab === 'verification' && (
          <div className="space-y-6">
            {/* Verification Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div 
                onClick={() => setStatusFilter('pending')}
                className={cn(
                  "p-4 rounded-xl border cursor-pointer transition-all",
                  statusFilter === 'pending' ? "bg-surface-900 border-warning shadow-md" : "bg-surface-900/60 border-surface-800 hover:border-surface-700"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-surface-400 font-medium">Pending Verification</span>
                  <Clock className="w-5 h-5 text-warning" />
                </div>
                <p className="text-2xl font-bold text-surface-0 mt-2">{pendingCount}</p>
                <p className="text-xs text-warning/90 mt-1">Requires management review</p>
              </div>

              <div 
                onClick={() => setStatusFilter('verified')}
                className={cn(
                  "p-4 rounded-xl border cursor-pointer transition-all",
                  statusFilter === 'verified' ? "bg-surface-900 border-success shadow-md" : "bg-surface-900/60 border-surface-800 hover:border-surface-700"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-surface-400 font-medium">Verified Faculty</span>
                  <CheckCircle className="w-5 h-5 text-success" />
                </div>
                <p className="text-2xl font-bold text-surface-0 mt-2">{verifiedCount}</p>
                <p className="text-xs text-success/90 mt-1">Full teaching controls active</p>
              </div>

              <div 
                onClick={() => setStatusFilter('rejected')}
                className={cn(
                  "p-4 rounded-xl border cursor-pointer transition-all",
                  statusFilter === 'rejected' ? "bg-surface-900 border-danger shadow-md" : "bg-surface-900/60 border-surface-800 hover:border-surface-700"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-surface-400 font-medium">Rejected / Blocked</span>
                  <XCircle className="w-5 h-5 text-danger" />
                </div>
                <p className="text-2xl font-bold text-surface-0 mt-2">{rejectedCount}</p>
                <p className="text-xs text-danger/90 mt-1">Controls disabled (read-only)</p>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-surface-500 uppercase tracking-wider">Filter:</span>
                {(['all', 'pending', 'verified', 'rejected'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setStatusFilter(filter)}
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium capitalize transition-colors",
                      statusFilter === filter 
                        ? "bg-brand-500 text-white" 
                        : "bg-surface-900 text-surface-400 hover:text-surface-200 border border-surface-800"
                    )}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <span className="text-xs text-surface-500">Showing {filteredTeachers.length} of {teacherProfiles.length} teachers</span>
            </div>

            {/* Main Verification List */}
            <div className="bg-surface-900 border border-surface-800 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-4 border-b border-surface-800 flex items-center justify-between bg-surface-900/80">
                <h3 className="font-semibold text-surface-100 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-brand-400" />
                  Teacher Account Requests & Verification
                </h3>
              </div>

              {filteredTeachers.length === 0 ? (
                <div className="p-12 text-center text-surface-500">
                  <CheckCircle className="w-10 h-10 mx-auto text-surface-600 mb-2" />
                  <p className="text-sm">No teacher records found under the "{statusFilter}" filter.</p>
                </div>
              ) : (
                <div className="divide-y divide-surface-800">
                  {filteredTeachers.map((teacher) => (
                    <div 
                      key={teacher.id} 
                      className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-surface-850/60 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-surface-800 border border-surface-700 flex items-center justify-center text-lg font-bold text-brand-400 shrink-0 mt-0.5">
                          {teacher.name.charAt(0)}
                        </div>
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-bold text-surface-100 text-base">{teacher.name}</h4>
                            <span className={cn(
                              "px-2 py-0.5 rounded-full text-xs font-semibold capitalize",
                              teacher.verificationStatus === 'verified' && "bg-success/15 text-success border border-success/30",
                              teacher.verificationStatus === 'pending' && "bg-warning/15 text-warning border border-warning/30",
                              teacher.verificationStatus === 'rejected' && "bg-danger/15 text-danger border border-danger/30"
                            )}>
                              {teacher.verificationStatus}
                            </span>
                            {teacher.assignedClasses.some(c => c.role === 'representative') && (
                              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-brand-500/15 text-brand-300 border border-brand-500/30">
                                Representative Teacher
                              </span>
                            )}
                          </div>
                          
                          <p className="text-sm text-surface-300 flex items-center gap-1.5">
                            <Building className="w-3.5 h-3.5 text-surface-500" />
                            {teacher.institution}
                          </p>

                          <div className="flex flex-wrap items-center gap-4 text-xs text-surface-400 pt-1">
                            <span className="flex items-center gap-1">
                              <Mail className="w-3.5 h-3.5 text-surface-500" />
                              {teacher.email}
                            </span>
                            {teacher.phone && (
                              <span className="flex items-center gap-1">
                                <Phone className="w-3.5 h-3.5 text-surface-500" />
                                {teacher.phone}
                              </span>
                            )}
                            <span>Subjects: {teacher.subjects.join(', ')}</span>
                          </div>

                          {teacher.rejectionReason && (
                            <p className="text-xs text-danger/90 pt-1 font-medium">
                              Rejection note: {teacher.rejectionReason}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                        <button
                          onClick={() => setSelectedTeacher(teacher)}
                          className="px-3 py-2 rounded-lg bg-surface-800 hover:bg-surface-700 text-surface-300 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Inspect Profile
                        </button>

                        {teacher.verificationStatus === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(teacher)}
                              className="px-4 py-2 rounded-lg bg-success hover:bg-success/90 text-surface-950 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
                            >
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                              Approve
                            </button>
                            <button
                              onClick={() => setRejectModalTeacher(teacher)}
                              className="px-3.5 py-2 rounded-lg bg-danger/10 hover:bg-danger/20 text-danger border border-danger/30 text-xs font-semibold transition-colors flex items-center gap-1.5"
                            >
                              <X className="w-3.5 h-3.5 stroke-[2.5]" />
                              Reject
                            </button>
                          </>
                        )}

                        {teacher.verificationStatus === 'rejected' && (
                          <button
                            onClick={() => handleApprove(teacher)}
                            className="px-3.5 py-2 rounded-lg bg-surface-800 hover:bg-surface-700 text-surface-300 hover:text-white text-xs font-semibold transition-colors"
                          >
                            Reconsider & Approve
                          </button>
                        )}

                        {teacher.verificationStatus === 'verified' && (
                          <button
                            onClick={() => setRejectModalTeacher(teacher)}
                            className="px-3 py-1.5 rounded-lg text-surface-500 hover:text-danger hover:bg-danger/10 text-xs font-medium transition-colors"
                          >
                            Revoke
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── TAB 2: Curricula & Boards (Pakistan-First Scope) ── */}
        {activeTab === 'curriculum' && (
          <div className="space-y-6">
            <div className="bg-surface-900 border border-surface-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-surface-100 mb-2">Registered Pakistan Curriculum Boards</h3>
              <p className="text-sm text-surface-400 mb-6">
                All subject combinations, streams, and class levels are dynamically loaded from verified board configurations.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pakistanBoards.map((board) => (
                  <div key={board.id} className="p-4 rounded-xl bg-surface-950/60 border border-surface-800 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-surface-100">{board.shortName}</h4>
                        <p className="text-xs text-surface-400 mt-0.5">{board.name}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-brand-500/20 text-brand-300">
                        {board.province}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-surface-800/80">
                      <p className="text-xs font-semibold text-surface-400 mb-1.5">Supported Classes & Streams:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {board.classes.map((cls) => (
                          <span key={cls.code} className="px-2 py-1 rounded bg-surface-850 text-surface-300 text-xs font-mono">
                            {cls.name.split(' (')[0]} ({cls.streams.length} Streams)
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 3: Official Syllabi & Knowledge Hierarchy ── */}
        {activeTab === 'materials' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-surface-100">Institutional Syllabi Storage</h3>
              <div className="bg-surface-900 border border-surface-800 rounded-2xl p-6 flex flex-col items-center text-center space-y-4">
                <Database className="w-12 h-12 text-brand-500" />
                <div>
                  <p className="text-3xl font-bold text-surface-0">142 Documents</p>
                  <p className="text-sm text-surface-400 mt-1">Official curriculum guides & board syllabus blueprints</p>
                </div>
                <div className="p-3 bg-surface-950 rounded-xl text-left w-full text-xs space-y-1.5 border border-surface-800">
                  <p className="text-surface-300 font-medium">✓ Tier 1: FBISE Matric Physics & Computer Syllabus (2024-25)</p>
                  <p className="text-surface-300 font-medium">✓ Tier 1: Punjab Board Intermediate Chemistry Model (2024-25)</p>
                  <p className="text-surface-300 font-medium">✓ Tier 2: Institutional Term Exam Specifications</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-surface-100">5-Tier Source Authority (Spec v2 §7)</h3>
              <div className="bg-surface-900 border border-surface-800 rounded-2xl p-6 flex flex-col items-center">
                <div className="flex flex-col items-center space-y-2 w-full max-w-sm">
                  <div className="px-4 py-2 bg-surface-950 border-2 border-brand-500 rounded-xl text-surface-0 font-bold text-sm w-full text-center shadow-sm">
                    Tier 1: Official Board Curriculum (Highest)
                  </div>
                  <ArrowDown className="w-4 h-4 text-surface-500" />
                  <div className="px-4 py-2 bg-surface-950 border-2 border-info rounded-xl text-surface-0 font-bold text-sm w-full text-center shadow-sm">
                    Tier 2: Administration / Institutional
                  </div>
                  <ArrowDown className="w-4 h-4 text-surface-500" />
                  <div className="px-4 py-2 bg-surface-950 border-2 border-success rounded-xl text-surface-0 font-bold text-sm w-full text-center shadow-sm">
                    Tier 3: Teacher-Verified Notes (Class AI)
                  </div>
                  <ArrowDown className="w-4 h-4 text-surface-500" />
                  <div className="px-4 py-2 bg-surface-950 border-2 border-warning rounded-xl text-surface-0 font-bold text-sm w-full text-center shadow-sm">
                    Tier 4: Student-Uploaded Notes (Contextual)
                  </div>
                  <ArrowDown className="w-4 h-4 text-surface-500" />
                  <div className="px-4 py-2 bg-surface-950 border border-surface-700 border-dashed rounded-xl text-surface-400 font-medium text-xs w-full text-center">
                    Tier 5: Fallback General Web Knowledge
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── MODAL: Profile Inspection ── */}
        <AnimatePresence>
          {selectedTeacher && (
            <div className="fixed inset-0 bg-surface-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-surface-900 border border-surface-750 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl p-6 space-y-6"
              >
                <div className="flex items-center justify-between border-b border-surface-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-500/20 text-brand-300 flex items-center justify-center font-bold">
                      {selectedTeacher.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-surface-100">{selectedTeacher.name}</h3>
                      <p className="text-xs text-surface-400">Teacher ID: {selectedTeacher.id}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedTeacher(null)}
                    className="p-1.5 rounded-lg text-surface-400 hover:text-white hover:bg-surface-800 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-surface-950 border border-surface-800">
                    <div>
                      <span className="text-xs text-surface-500">Status</span>
                      <p className="font-bold capitalize text-surface-200">{selectedTeacher.verificationStatus}</p>
                    </div>
                    <div>
                      <span className="text-xs text-surface-500">Submitted On</span>
                      <p className="font-medium text-surface-200">{new Date(selectedTeacher.submittedAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-surface-400 uppercase tracking-wider">Institution / School</span>
                    <p className="font-medium text-surface-100 mt-0.5">{selectedTeacher.institution}</p>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-surface-400 uppercase tracking-wider">Academic Qualifications</span>
                    <p className="font-medium text-surface-100 mt-0.5">{selectedTeacher.qualifications}</p>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-surface-400 uppercase tracking-wider">Assigned Teaching Subjects</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {selectedTeacher.subjects.map(s => (
                        <span key={s} className="px-2 py-0.5 rounded bg-surface-800 text-xs text-surface-200">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-surface-400 uppercase tracking-wider">Assigned Classes</span>
                    {selectedTeacher.assignedClasses.length === 0 ? (
                      <p className="text-xs text-surface-500 mt-1 italic">No classes assigned yet. Approving will assign default class role.</p>
                    ) : (
                      <div className="space-y-1 mt-1">
                        {selectedTeacher.assignedClasses.map(c => (
                          <div key={c.classId} className="flex items-center justify-between px-2.5 py-1 rounded bg-surface-800 text-xs">
                            <span className="font-medium">{c.className} (Sec {c.section})</span>
                            <span className="capitalize font-bold text-brand-400">{c.role}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-surface-800">
                  <button
                    onClick={() => setSelectedTeacher(null)}
                    className="px-4 py-2 rounded-lg bg-surface-800 hover:bg-surface-700 text-surface-300 text-sm font-medium"
                  >
                    Close
                  </button>
                  {selectedTeacher.verificationStatus === 'pending' && (
                    <button
                      onClick={() => handleApprove(selectedTeacher)}
                      className="px-4 py-2 rounded-lg bg-success hover:bg-success/90 text-surface-950 font-bold text-sm shadow-sm"
                    >
                      Approve Account
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ── MODAL: Rejection Prompt ── */}
        <AnimatePresence>
          {rejectModalTeacher && (
            <div className="fixed inset-0 bg-surface-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-surface-900 border border-surface-750 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl"
              >
                <div className="flex items-center gap-3 text-danger">
                  <AlertCircle className="w-6 h-6 shrink-0" />
                  <h3 className="text-lg font-bold">Reject Teacher Application</h3>
                </div>

                <p className="text-sm text-surface-300">
                  You are setting <strong>{rejectModalTeacher.name}</strong> to Rejected status. The user will remain in read-only mode and privileged teacher actions will be disabled.
                </p>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-surface-400 uppercase">Reason for Rejection</label>
                  <textarea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    rows={3}
                    className="w-full rounded-xl bg-surface-950 border border-surface-800 p-3 text-sm text-surface-100 focus:outline-none focus:border-danger"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    onClick={() => setRejectModalTeacher(null)}
                    className="px-4 py-2 rounded-lg bg-surface-800 hover:bg-surface-700 text-surface-300 text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRejectConfirm}
                    className="px-4 py-2 rounded-lg bg-danger hover:bg-danger/90 text-white font-bold text-sm"
                  >
                    Confirm Rejection
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
