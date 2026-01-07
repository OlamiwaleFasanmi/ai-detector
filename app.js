const { useState } = React;
const { Upload, AlertCircle, CheckCircle, XCircle, FileVideo, FileImage, FileText, Loader2, Shield, Key } = lucide;

function AIDetectorApp() {
  const [activeTab, setActiveTab] = useState('upload');
  const [file, setFile] = useState(null);
  const [textInput, setTextInput] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');

  const analyzeContent = async () => {
    if (!textInput.trim() && !file) {
      setError('Please enter text or upload a file');
      return;
    }

    if (!apiKey) {
      setError('Please enter your API key in the Setup tab');
      return;
    }

    setAnalyzing(true);
    setError('');
    setResult(null);

    try {
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockResult = {
        isAI: Math.random() > 0.5,
        confidence: (Math.random() * 40 + 60).toFixed(1),
        fileName: file ? file.name : 'Direct Input',
        timestamp: new Date().toLocaleString()
      };

      setResult(mockResult);
    } catch (err) {
      setError('Analysis failed. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">AI Detector Pro</h1>
              <p className="text-xs text-blue-300">Multi-Model AI Detection</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex gap-2 mb-8 bg-white/5 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-6 py-2 rounded-lg font-medium ${
              activeTab === 'upload' ? 'bg-blue-600' : 'text-white/60'
            }`}
          >
            Analyze
          </button>
          <button
            onClick={() => setActiveTab('setup')}
            className={`px-6 py-2 rounded-lg font-medium ${
              activeTab === 'setup' ? 'bg-blue-600' : 'text-white/60'
            }`}
          >
            Setup
          </button>
        </div>

        {activeTab === 'setup' && (
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold mb-4">API Setup</h2>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"
            />
            <p className="text-sm text-white/60 mt-2">
              Get your free API key at gptzero.me
            </p>
          </div>
        )}

        {activeTab === 'upload' && (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="font-semibold mb-3">Paste Text to Analyze</h3>
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Paste text here..."
                className="w-full h-48 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"
              />
            </div>

            <button
              onClick={analyzeContent}
              disabled={analyzing}
              className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-medium disabled:opacity-50"
            >
              {analyzing ? 'Analyzing...' : 'Analyze Content'}
            </button>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300">
                {error}
              </div>
            )}

            {result && (
              <div className={`rounded-2xl p-8 border ${
                result.isAI ? 'bg-red-500/10 border-red-500/30' : 'bg-green-500/10 border-green-500/30'
              }`}>
                <h3 className="text-2xl font-bold mb-2">
                  {result.isAI ? 'AI Generated' : 'Human Created'}
                </h3>
                <p>Confidence: {result.confidence}%</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Render the app
ReactDOM.render(<AIDetectorApp />, document.getElementById('root'));
