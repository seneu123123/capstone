import React, { useState } from 'react';
import { 
  Code, 
  Server, 
  Database, 
  Terminal, 
  Copy, 
  Check, 
  Play, 
  Key, 
  Send, 
  Cpu, 
  Layers, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  FileCode,
  Globe,
  ArrowRight
} from 'lucide-react';

export const LaravelIntegrationHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'code' | 'sandbox' | 'schema' | 'devops'>('code');
  const [selectedFile, setSelectedFile] = useState<string>('routes/api.php');
  const [copiedFile, setCopiedFile] = useState<boolean>(false);

  // REST API Sandbox State
  const [apiEndpoint, setApiEndpoint] = useState<string>('POST /api/v1/auth/login');
  const [sanctumToken, setSanctumToken] = useState<string>('1|sanctum_p3x_98412039841029384910238');
  const [requestBody, setRequestBody] = useState<string>(
    JSON.stringify({ email: 'operator@voyagecraft.com', password: 'secretpassword' }, null, 2)
  );
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [isLoadingApi, setIsLoadingApi] = useState<boolean>(false);

  const fileContents: Record<string, { label: string; lang: string; code: string }> = {
    'routes/api.php': {
      label: 'REST API Routes (routes/api.php)',
      lang: 'php',
      code: `<?php
use Illuminate\\Support\\Facades\\Route;
use App\\Http\\Controllers\\Api\\SanctumAuthController;
use App\\Http\\Controllers\\Api\\BookingController;

// Public Endpoints
Route::prefix('v1/auth')->group(function () {
    Route::post('/register', [SanctumAuthController::class, 'register']);
    Route::post('/login', [SanctumAuthController::class, 'login']);
});

// Protected Endpoints - Laravel Sanctum Auth Guard
Route::prefix('v1')->middleware('auth:sanctum')->group(function () {
    Route::get('/auth/me', [SanctumAuthController::class, 'me']);
    Route::get('/bookings', [BookingController::class, 'index']);
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::get('/bookings/{id}', [BookingController::class, 'show']);
    Route::patch('/bookings/{id}/status', [BookingController::class, 'updateStatus']);
});`
    },
    'SanctumAuthController.php': {
      label: 'Auth Controller (SanctumAuthController.php)',
      lang: 'php',
      code: `<?php
namespace App\\Http\\Controllers\\Api;

use App\\Http\\Controllers\\Controller;
use Illuminate\\Http\\Request;
use App\\Models\\User;
use Illuminate\\Support\\Facades\\Hash;

class SanctumAuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate(['email' => 'required|email', 'password' => 'required']);
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $user->createToken('sanctum_tour_token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ]);
    }
}`
    },
    'BookingController.php': {
      label: 'Booking API Controller (BookingController.php)',
      lang: 'php',
      code: `<?php
namespace App\\Http\\Controllers\\Api;

use App\\Http\\Controllers\\Controller;
use Illuminate\\Http\\Request;
use App\\Models\\Booking;
use App\\Models\\Invoice;
use Illuminate\\Support\\Str;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'tour_package_id' => 'required|string',
            'tour_title' => 'required|string',
            'customer' => 'required|array',
            'passengers' => 'required|array|min:1',
            'travel_date' => 'required|date',
            'num_pax' => 'required|integer',
            'total_price' => 'required|numeric'
        ]);

        $bookingRef = 'TT-' . date('Y') . '-' . rand(1000, 9999);

        $booking = Booking::create([
            'id' => (string) Str::uuid(),
            'booking_ref' => $bookingRef,
            'tour_package_id' => $validated['tour_package_id'],
            'tour_title' => $validated['tour_title'],
            'customer' => $validated['customer'],
            'passengers' => $validated['passengers'],
            'travel_date' => $validated['travel_date'],
            'num_pax' => $validated['num_pax'],
            'total_price' => $validated['total_price'],
            'booking_status' => 'Confirmed'
        ]);

        return response()->json(['status' => 'success', 'booking_ref' => $bookingRef, 'data' => $booking], 201);
    }
}`
    },
    'app.blade.php': {
      label: 'Blade Master Layout (resources/views/layouts/app.blade.php)',
      lang: 'html',
      code: `<!DOCTYPE html>
<html lang="en" class="h-full bg-slate-950">
<head>
    <meta charset="UTF-8">
    <title>VoyageCraft Capstone — Laravel + Blade</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body class="bg-slate-950 text-slate-100 flex flex-col min-h-screen">
    <nav class="bg-slate-900 border-b border-slate-800 p-4">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
            <div class="flex items-center gap-2">
                <i data-lucide="compass" class="text-cyan-400"></i>
                <span class="font-bold text-white">VoyageCraft</span>
            </div>
            <div class="text-xs text-slate-400">Sanctum Auth Active</div>
        </div>
    </nav>
    <main class="flex-1 max-w-7xl w-full mx-auto p-6">
        @yield('content')
    </main>
</body>
</html>`
    },
    'create_bookings_table.php': {
      label: 'PostgreSQL Migration (create_bookings_table.php)',
      lang: 'php',
      code: `<?php
use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('booking_ref')->unique();
            $table->uuid('tour_package_id')->index();
            $table->string('tour_title');
            $table->jsonb('customer'); // PostgreSQL JSONB column
            $table->jsonb('passengers');
            $table->date('travel_date');
            $table->integer('num_pax');
            $table->decimal('total_price', 12, 2);
            $table->string('booking_status')->default('Confirmed');
            $table->timestamps();
        });
    }
};`
    },
    'deploy.yml': {
      label: 'GitHub Actions CI/CD (.github/workflows/deploy.yml)',
      lang: 'yaml',
      code: `name: Laravel CI/CD Pipeline
on: [push, pull_request]
jobs:
  laravel-tests:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_DB: voyagecraft_db
          POSTGRES_PASSWORD: secretpassword
        ports: [5432:5432]
    steps:
      - uses: actions/checkout@v3
      - uses: shivammathur/setup-php@v2
        with: { php-version: '8.2', extensions: 'pdo, pdo_pgsql' }
      - run: composer install
      - run: php artisan migrate --force
      - run: vendor/bin/phpunit`
    },
    'render.yaml': {
      label: 'Render Deployment Blueprint (render.yaml)',
      lang: 'yaml',
      code: `services:
  - type: web
    name: voyagecraft-laravel-api
    env: docker
    plan: free
    region: singapore
    envVars:
      - key: APP_ENV
        value: production
      - key: DB_CONNECTION
        value: pgsql
      - key: DB_HOST
        fromDatabase: { name: voyagecraft-postgres, property: host }

  - type: postgres
    name: voyagecraft-postgres
    plan: free
    databaseName: voyagecraft_capstone`
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(fileContents[selectedFile].code);
    setCopiedFile(true);
    setTimeout(() => setCopiedFile(false), 2000);
  };

  const handleRunApiTest = () => {
    setIsLoadingApi(true);
    setTimeout(() => {
      if (apiEndpoint.includes('login')) {
        setApiResponse({
          status: 'success',
          message: 'Authenticated successfully via Laravel Sanctum',
          access_token: sanctumToken,
          token_type: 'Bearer',
          user: {
            id: 'usr-90412',
            name: 'Colleague Operator',
            email: 'operator@voyagecraft.com',
            role: 'operator'
          }
        });
      } else if (apiEndpoint.includes('bookings')) {
        setApiResponse({
          status: 'success',
          message: 'Booking record inserted into PostgreSQL database table [bookings]',
          booking_ref: 'TT-2026-9842',
          data: {
            id: 'b842a12d-98e3-4d22-b91c-12003894',
            booking_ref: 'TT-2026-9842',
            tour_title: 'El Nido Island Hopping Tour A & C',
            customer: { full_name: 'Juan Dela Cruz', email: 'juan@example.ph' },
            num_pax: 2,
            total_price: 9000,
            booking_status: 'Confirmed',
            payment_status: 'Unpaid'
          }
        });
      } else {
        setApiResponse({
          status: 'success',
          count: 5,
          database: 'PostgreSQL 15 on Render',
          query_time_ms: 4.2,
          data: [
            { id: '1', code: 'PKG-ELNIDO-01', title: 'El Nido Premium Island Hopping', price: 4500 },
            { id: '2', code: 'PKG-CORON-02', title: 'Coron Super Ultimate Island Tour', price: 3800 }
          ]
        });
      }
      setIsLoadingApi(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Submodule Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Server className="w-4 h-4" />
              <span>Colleague Integration & Delivery Hub</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Laravel + Sanctum + PostgreSQL Stack Specifications
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Inspect production PHP Controllers, Blade views, PostgreSQL schema migrations, Sanctum REST API endpoints, GitHub Actions CI/CD workflows, and Render deployment scripts.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-3 py-1.5 rounded-xl bg-slate-950 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Laravel Sanctum REST API
            </span>
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-800 text-xs">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Frontend Framework</span>
            <div className="text-white font-bold mt-0.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              Laravel Blade + Tailwind
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Backend & Auth</span>
            <div className="text-white font-bold mt-0.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              PHP 8.2 + Laravel Sanctum
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Relational Database</span>
            <div className="text-white font-bold mt-0.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              PostgreSQL (JSONB + UUID)
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">DevOps & Deployment</span>
            <div className="text-white font-bold mt-0.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              GitHub Actions + Render
            </div>
          </div>
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setActiveTab('code')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
            activeTab === 'code'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Code className="w-4 h-4" />
          <span>Laravel Source Code Explorer</span>
        </button>

        <button
          onClick={() => setActiveTab('sandbox')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
            activeTab === 'sandbox'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>REST API Sandbox & Bearer Tokens</span>
        </button>

        <button
          onClick={() => setActiveTab('schema')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
            activeTab === 'schema'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>PostgreSQL DB Schema</span>
        </button>

        <button
          onClick={() => setActiveTab('devops')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
            activeTab === 'devops'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>GitHub Actions & Render Setup</span>
        </button>
      </div>

      {/* TAB 1: CODE EXPLORER */}
      {activeTab === 'code' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* File Tree Sidebar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2 text-xs">
            <span className="text-[10px] font-bold text-slate-500 uppercase block mb-3">Project File Tree</span>
            {Object.keys(fileContents).map((fileKey) => (
              <button
                key={fileKey}
                onClick={() => setSelectedFile(fileKey)}
                className={`w-full text-left px-3 py-2.5 rounded-xl font-mono text-[11px] transition flex items-center justify-between ${
                  selectedFile === fileKey
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-950'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <FileCode className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                  <span className="truncate">{fileKey}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Code Viewer */}
          <div className="md:col-span-3 bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="font-mono text-xs text-cyan-400 font-bold">
                {fileContents[selectedFile].label}
              </span>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs rounded-lg border border-slate-700 transition"
              >
                {copiedFile ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy File</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-4 bg-slate-900/80 rounded-xl text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed border border-slate-800">
              <code>{fileContents[selectedFile].code}</code>
            </pre>
          </div>
        </div>
      )}

      {/* TAB 2: REST API SANDBOX */}
      {activeTab === 'sandbox' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-cyan-400" />
              <span>Interactive REST API Sandbox</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Simulate live REST API calls to the Laravel Sanctum backend endpoints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Request Controls */}
            <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Select API Endpoint</label>
                <select
                  value={apiEndpoint}
                  onChange={(e) => {
                    const endpoint = e.target.value;
                    setApiEndpoint(endpoint);
                    if (endpoint.includes('login')) {
                      setRequestBody(JSON.stringify({ email: 'operator@voyagecraft.com', password: 'secretpassword' }, null, 2));
                    } else if (endpoint.includes('bookings')) {
                      setRequestBody(JSON.stringify({
                        tour_package_id: 'pkg-elnido-01',
                        tour_title: 'El Nido Island Hopping Tour A & C',
                        customer: { full_name: 'Juan Dela Cruz', email: 'juan@example.ph', phone: '09171234567' },
                        passengers: [{ fullName: 'Juan Dela Cruz', age: 28 }],
                        travel_date: '2026-08-15',
                        num_pax: 2,
                        total_price: 9000
                      }, null, 2));
                    } else {
                      setRequestBody('{}');
                    }
                  }}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                >
                  <option value="POST /api/v1/auth/login">POST /api/v1/auth/login (Sanctum Auth)</option>
                  <option value="GET /api/v1/packages">GET /api/v1/packages (Public Catalog)</option>
                  <option value="POST /api/v1/bookings">POST /api/v1/bookings (Create PNR Booking)</option>
                  <option value="GET /api/v1/bookings">GET /api/v1/bookings (List Booking Manifest)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1 flex items-center justify-between">
                  <span>Sanctum Authorization Header</span>
                  <span className="text-[10px] text-cyan-400 font-mono">Bearer Token</span>
                </label>
                <div className="flex items-center gap-2 bg-slate-900 p-2 rounded-xl border border-slate-800 font-mono text-[11px] text-cyan-300">
                  <Key className="w-4 h-4 text-cyan-400 shrink-0" />
                  <input
                    type="text"
                    value={sanctumToken}
                    onChange={(e) => setSanctumToken(e.target.value)}
                    className="bg-transparent border-none w-full text-cyan-300 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Request Payload (JSON)</label>
                <textarea
                  rows={6}
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 font-mono text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                onClick={handleRunApiTest}
                disabled={isLoadingApi}
                className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition"
              >
                {isLoadingApi ? (
                  <span>Executing Request...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Execute REST Request</span>
                  </>
                )}
              </button>
            </div>

            {/* Response Display */}
            <div className="space-y-2 bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-300">HTTP Response Body</span>
                {apiResponse && (
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                    200 OK / 201 Created
                  </span>
                )}
              </div>

              <div className="p-4 bg-slate-900 rounded-xl min-h-[300px] border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto">
                {apiResponse ? (
                  <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-500 text-center italic py-20">
                    Click "Execute REST Request" to simulate a real Laravel Sanctum API call.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: POSTGRESQL SCHEMA */}
      {activeTab === 'schema' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-400" />
              <span>PostgreSQL Database Schema & Relational Structure</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Optimized PostgreSQL tables using native UUIDs, foreign key cascades, and JSONB document columns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="font-bold text-cyan-400 font-mono text-sm">Table: tour_packages</div>
              <ul className="space-y-1 font-mono text-[11px] text-slate-300">
                <li>• id (UUID, PK)</li>
                <li>• code (VARCHAR, UNIQUE)</li>
                <li>• title (VARCHAR)</li>
                <li>• price_per_pax (DECIMAL 12,2)</li>
                <li>• inclusions (JSONB)</li>
                <li>• itinerary (JSONB)</li>
              </ul>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="font-bold text-cyan-400 font-mono text-sm">Table: bookings</div>
              <ul className="space-y-1 font-mono text-[11px] text-slate-300">
                <li>• id (UUID, PK)</li>
                <li>• booking_ref (VARCHAR, UNIQUE)</li>
                <li>• customer (JSONB)</li>
                <li>• passengers (JSONB)</li>
                <li>• travel_date (DATE)</li>
                <li>• booking_status (VARCHAR)</li>
              </ul>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="font-bold text-cyan-400 font-mono text-sm">Table: invoices</div>
              <ul className="space-y-1 font-mono text-[11px] text-slate-300">
                <li>• id (UUID, PK)</li>
                <li>• booking_id (UUID, FK)</li>
                <li>• total_amount (DECIMAL)</li>
                <li>• balance_due (DECIMAL)</li>
                <li>• payments (JSONB)</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: DEVOPS */}
      {activeTab === 'devops' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-emerald-400" />
              <span>DevOps Pipeline: GitHub Actions & Render Integration</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Instructions for colleagues on running CI/CD and deploying to Render.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-sm">1. Local Colleague Setup</h3>
              <ol className="list-decimal list-inside space-y-2 text-slate-300">
                <li>Clone repository: <code className="bg-slate-900 px-1.5 py-0.5 rounded text-cyan-400">git clone repo.git</code></li>
                <li>Install packages: <code className="bg-slate-900 px-1.5 py-0.5 rounded text-cyan-400">composer install</code></li>
                <li>Copy environment: <code className="bg-slate-900 px-1.5 py-0.5 rounded text-cyan-400">cp .env.example .env</code></li>
                <li>Run migrations: <code className="bg-slate-900 px-1.5 py-0.5 rounded text-cyan-400">php artisan migrate</code></li>
                <li>Serve API: <code className="bg-slate-900 px-1.5 py-0.5 rounded text-cyan-400">php artisan serve</code></li>
              </ol>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-sm">2. Render Deployment</h3>
              <p className="text-slate-300 leading-relaxed">
                Connect the GitHub repository to Render using the included <code className="text-cyan-400 font-mono">render.yaml</code> blueprint. Render automatically provisions the PostgreSQL database and deploys the Laravel Sanctum REST API.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
