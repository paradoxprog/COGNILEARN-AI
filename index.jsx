import React, { useState } from 'react';
import { Play, Volume2, Sparkles, BookOpen, Compass, CheckCircle2 } from 'lucide-react';

export default function Dashboard() {
  const [selectedModule, setSelectedModule] = useState('skills');
  const [activeStep, setActiveStep] = useState(0);

  // Mock JSON engine output mimicking the AI prompt layer
  const learningModules = {
    skills: {
      title: "Taking Public Transit",
      icon: <Compass className="w-6 6 text-blue-600" />,
      steps: [
        { text: "Find your bus stop sign.", voice: "Step 1. Find your bus stop sign." },
        { text: "Wait safely on the sidewalk.", voice: "Step 2. Wait safely on the sidewalk." },
        { text: "Step onto the bus carefully.", voice: "Step 3. Step onto the bus carefully." },
        { text: "Show your transit pass to driver.", voice: "Step 4. Show your transit pass to the driver." }
      ]
    },
    academics: {
      title: "Understanding Plants",
      icon: <BookOpen className="w-6 h-6 text-green-600" />,
      steps: [
        { text: "Roots drink water from soil.", voice: "Roots drink water from the soil." },
        { text: "Stems carry water up high.", voice: "Stems carry water up high." },
        { text: "Leaves catch the bright sunlight.", voice: "Leaves catch the bright sunlight." },
        { text: "Sunlight helps the plant grow.", voice: "Sunlight helps the plant grow." }
      ]
    }
  };

  const currentModule = learningModules[selectedModule];

  // Web Speech API Integration for Voice Narration
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any current speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85; // Calibrated slower pace for cognitive accessibility
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-6 antialiased selection:bg-blue-100">
      {/* Top Professional Global Navbar */}
      <header className="max-w-5xl mx-auto flex items-center justify-between bg-white border border-slate-200 px-6 py-4 rounded-2xl shadow-sm mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-600 rounded-xl text-white shadow-md shadow-blue-200">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight text-slate-900">CogniLearn AI</h1>
            <p className="text-xs font-medium text-slate-500">Public Service Platform</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-semibold text-slate-600 tracking-wide uppercase">AI Companion Online</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Control Sidebar */}
        <section className="md:col-span-1 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm h-fit">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Choose Learning Track</h2>
          <div className="space-y-3">
            <button
              onClick={() => { setSelectedModule('skills'); setActiveStep(0); }}
              className={`w-full flex items-center gap-4 p-4 rounded-xl font-semibold border transition-all duration-200 text-left ${
                selectedModule === 'skills'
                  ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className={`p-2 rounded-lg ${selectedModule === 'skills' ? 'bg-white shadow-sm' : 'bg-slate-100'}`}>
                {learningModules.skills.icon}
              </div>
              <span>Daily Life Skills</span>
            </button>

            <button
              onClick={() => { setSelectedModule('academics'); setActiveStep(0); }}
              className={`w-full flex items-center gap-4 p-4 rounded-xl font-semibold border transition-all duration-200 text-left ${
                selectedModule === 'academics'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className={`p-2 rounded-lg ${selectedModule === 'academics' ? 'bg-white shadow-sm' : 'bg-slate-100'}`}>
                {learningModules.academics.icon}
              </div>
              <span>Basic Academics</span>
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60">
              <h3 className="font-bold text-sm text-slate-800 mb-1">💡 Accessibility Note</h3>
              <p className="text-xs leading-relaxed text-slate-500">
                This environment enforces large touch targets, literal phrases, zero timers, and automated text-to-speech to optimize navigation comfort.
              </p>
            </div>
          </div>
        </section>

        {/* Center/Right Dynamic Presentation Canvas */}
        <section className="md:col-span-2 flex flex-col gap-6">
          <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm flex-1 flex flex-col justify-between min-h-[400px]">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-xs font-bold uppercase tracking-widest bg-slate-100 text-slate-500 px-2.5 py-1 rounded-md border border-slate-200">
                  Module
                </span>
                <h3 className="font-bold text-slate-700">{currentModule.title}</h3>
              </div>

              {/* Core Active Step Render Area */}
              <div className="py-8 text-center flex flex-col items-center justify-center min-h-[180px]">
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug max-w-xl">
                  {currentModule.steps[activeStep].text}
                </h2>
                
                {/* Massive Multi-modal Action Anchor */}
                <button
                  onClick={() => speakText(currentModule.steps[activeStep].voice)}
                  className="mt-8 flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all duration-150 transform active:scale-95 group text-lg"
                >
                  <Volume2 className="w-6 h-6 animate-pulse group-hover:scale-110 transition-transform" />
                  Listen to Step
                </button>
              </div>
            </div>

            {/* Non-punitive Linear Progress Stepper */}
            <div className="border-t border-slate-100 pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-slate-500">
                  Step {activeStep + 1} of {currentModule.steps.length}
                </span>
                <div className="flex gap-1">
                  {currentModule.steps.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        idx === activeStep ? 'w-8 bg-blue-600' : 'w-2.5 bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep(prev => prev - 1)}
                  className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:hover:bg-slate-100 text-slate-700 font-bold rounded-xl transition-all border border-slate-200/80 disabled:cursor-not-allowed text-center"
                >
                  Go Back
                </button>
                
                {activeStep < currentModule.steps.length - 1 ? (
                  <button
                    onClick={() => setActiveStep(prev => prev 1)}
                    className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-sm transition-all text-center"
                  >
                    Next Step
                  </button>
                ) : (
                  <div className="flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 font-bold rounded-xl border border-emerald-200 py-3.5 px-6 animate-fade-in">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    <span>All Done!</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
