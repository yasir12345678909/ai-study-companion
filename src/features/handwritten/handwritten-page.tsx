import { useState } from 'react'
import { ArrowLeft, Download, PenTool, Type, AlignLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

type StyleVariant = 'neat' | 'casual' | 'compact'

export function HandwrittenPage() {
  const [style, setStyle] = useState<StyleVariant>('neat')

  const fontStyles = {
    neat: "font-['Segoe_Script',cursive] text-lg leading-loose tracking-wide",
    casual: "font-['Comic_Sans_MS',cursive] text-md leading-relaxed",
    compact: "font-mono text-sm leading-normal tracking-tight"
  }

  const spacingStyles = {
    neat: "space-y-8",
    casual: "space-y-6",
    compact: "space-y-4"
  }

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 flex flex-col">
      {/* Header */}
      <header className="bg-surface-0 dark:bg-surface-900 border-b border-surface-200 dark:border-surface-800 p-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-surface-600 dark:text-surface-300" />
          </button>
          <h1 className="font-bold text-surface-900 dark:text-surface-50">Notebook Revision</h1>
        </div>
        <div className="flex items-center gap-2 bg-surface-100 dark:bg-surface-800 p-1 rounded-lg">
          <button 
            onClick={() => setStyle('neat')}
            className={cn("px-3 py-1.5 text-sm rounded-md flex items-center gap-2 transition-all", style === 'neat' ? "bg-surface-0 dark:bg-surface-700 shadow-sm text-brand-600 dark:text-brand-400 font-medium" : "text-surface-600 dark:text-surface-400 hover:text-surface-900")}
          >
            <PenTool className="w-4 h-4" />
            <span className="hidden sm:inline">Neat</span>
          </button>
          <button 
            onClick={() => setStyle('casual')}
            className={cn("px-3 py-1.5 text-sm rounded-md flex items-center gap-2 transition-all", style === 'casual' ? "bg-surface-0 dark:bg-surface-700 shadow-sm text-brand-600 dark:text-brand-400 font-medium" : "text-surface-600 dark:text-surface-400 hover:text-surface-900")}
          >
            <Type className="w-4 h-4" />
            <span className="hidden sm:inline">Casual</span>
          </button>
          <button 
            onClick={() => setStyle('compact')}
            className={cn("px-3 py-1.5 text-sm rounded-md flex items-center gap-2 transition-all", style === 'compact' ? "bg-surface-0 dark:bg-surface-700 shadow-sm text-brand-600 dark:text-brand-400 font-medium" : "text-surface-600 dark:text-surface-400 hover:text-surface-900")}
          >
            <AlignLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Compact</span>
          </button>
        </div>
      </header>

      {/* Main Content - Notebook Wrapper */}
      <main className="flex-1 p-4 sm:p-8 flex justify-center items-start overflow-y-auto">
        {/* Notebook Page */}
        <div className="relative w-full max-w-3xl min-h-[800px] bg-[#fef9ef] rounded-r-xl shadow-md border border-surface-200 overflow-hidden text-surface-900 pb-16">
          
          {/* Notebook Margin Line */}
          <div className="absolute top-0 bottom-0 left-12 sm:left-20 w-0.5 bg-danger-400/50 z-0"></div>
          
          {/* Notebook Ruled Lines */}
          <div 
            className="absolute inset-0 z-0 pointer-events-none opacity-20"
            style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #94a3b8 31px, #94a3b8 32px)', marginTop: '32px' }}
          ></div>

          {/* Content Area */}
          <div className={cn("relative z-10 pl-16 sm:pl-28 pr-8 pt-12", fontStyles[style], spacingStyles[style])}>
            <div className="text-right text-surface-500 text-sm mb-8 italic">Date: {new Date().toLocaleDateString()}</div>
            
            <h1 className="text-3xl font-bold underline decoration-brand-500/30 decoration-4 underline-offset-4 mb-6 text-brand-900">
              Physics Ch 4: Turning Effect of Forces
            </h1>

            <section>
              <h2 className="text-xl font-bold text-surface-800 mb-2">Definitions</h2>
              <ul className="list-none space-y-4">
                <li>
                  <span className="font-bold bg-warning-200 px-1 rounded-sm">Momentum (p):</span> 
                  {" "}The product of mass and velocity of an object. It is a vector quantity.
                </li>
                <li>
                  <span className="font-bold bg-warning-200 px-1 rounded-sm">Impulse:</span> 
                  {" "}The change in momentum, calculated as Force multiplied by the time interval (Δt).
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-surface-800 mb-2">Key Formulas</h2>
              <div className="space-y-4">
                <div className="border-2 border-brand-300 rounded-lg p-4 inline-block bg-white shadow-sm transform -rotate-1">
                  <div className="font-bold text-xl text-brand-700">p = m × v</div>
                  <div className="text-sm text-surface-500 mt-1">m = mass, v = velocity</div>
                </div>
                <br/>
                <div className="border-2 border-brand-300 rounded-lg p-4 inline-block bg-white shadow-sm transform rotate-1">
                  <div className="font-bold text-xl text-brand-700">F = m × a</div>
                  <div className="text-sm text-surface-500 mt-1">Newton's Second Law</div>
                </div>
                <br/>
                <div className="border-2 border-brand-300 rounded-lg p-4 inline-block bg-white shadow-sm">
                  <div className="font-bold text-xl text-brand-700">Impulse = F × Δt = Δp</div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-surface-800 mb-2">Important Points</h2>
              <ul className="list-disc pl-6 space-y-2 marker:text-brand-500">
                <li><span className="underline">Law of Conservation of Momentum:</span> In an isolated system, the total momentum remains constant.</li>
                <li>Collisions can be elastic (kinetic energy conserved) or inelastic (kinetic energy not conserved).</li>
                <li>Momentum is always conserved in both types of collisions.</li>
              </ul>
            </section>

            <div className="mt-12 p-4 border-l-4 border-danger-400 bg-danger-50 text-danger-900 rounded-r-md transform rotate-1">
              <strong>Note:</strong> Very important for board exam short questions! Review derivations.
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
