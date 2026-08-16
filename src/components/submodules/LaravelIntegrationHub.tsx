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
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const LaravelIntegrationHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'code' | 'sandbox' | 'schema' | 'devops'>('code');
  const [selectedFile, setSelectedFile] = useState<string>('routes/api.php');
  const [copiedFile, setCopiedFile] = useState<boolean>(false);

  // REST API Sandbox State
  const [apiEndpoint, setApiEndpoint] = useState<string>('POST /api/v1/auth/login');
  const [sanctumToken, setSanctumToken] = useState<string>('1|sanctum_p3x_98412039841029384910238');
  const [requestBody, setRequestBody] = useState<string>(
    JSON.stringify({ email: 'operator@holidaytravelers.ph', password: 'secretpassword' }, null, 2)
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
<html lang="en" class="h-full bg-[#070B0E]">
<head>
    <meta charset="UTF-8">
    <title>Holiday Travelers Travel and Tours Inc — Laravel + Blade</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body class="bg-[#070B0E] text-[#F3EFE0] flex flex-col min-h-screen">
    <nav class="bg-[#0B1014] border-b border-white/10 p-4">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
            <div class="flex items-center gap-2">
                <i data-lucide="compass" class="text-[#F26A4F]"></i>
                <span class="font-serif text-lg text-white">Holiday Travelers</span>
            </div>
            <div class="text-xs text-sand-muted">Sanctum Auth Active</div>
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
          POSTGRES_DB: holidaytravelers_db
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
    name: holidaytravelers-laravel-api
    env: docker
    plan: free
    region: singapore
    envVars:
      - key: APP_ENV
        value: production
      - key: DB_CONNECTION
        value: pgsql
      - key: DB_HOST
        fromDatabase: { name: holidaytravelers-postgres, property: host }

  - type: postgres
    name: holidaytravelers-postgres
    plan: free
    databaseName: holidaytravelers_capstone`
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
          access_token: sanctumToken,
          token_type: 'Bearer',
          user: {
            id: 'usr-001',
            name: 'Operations Manager',
            email: 'operator@holidaytravelers.ph',
            role: 'Lead Dispatcher'
          }
        });
      } else {
        setApiResponse({
          status: 'success',
          booking_ref: 'TT-2026-9812',
          message: 'PostgreSQL transaction committed via Laravel Eloquent ORM.'
        });
      }
      setIsLoadingApi(false);
    }, 600);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-[#0B1014] border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sunset-coral text-xs font-sans-body tracking-[0.25em] uppercase font-medium">
              <Server className="w-4 h-4" />
              <span>Integration Architecture Hub</span>
            </div>
            <h1 className="font-serif-display text-3xl sm:text-4xl font-light text-ivory tracking-wide">
              Laravel + Sanctum + PostgreSQL Stack
            </h1>
            <p className="text-xs sm:text-sm text-sand-muted max-w-2xl font-light leading-relaxed">
              Inspect PHP controllers, Blade layouts, PostgreSQL migration scripts, Sanctum Bearer tokens, GitHub Actions CI/CD, and Render deployment templates.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-4 py-2 rounded-full bg-[#070B0E] border border-sunset-coral/30 text-sunset-coral font-mono text-xs font-medium flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Sanctum REST API
            </span>
          </div>
        </div>

        {/* Tech Stack Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-white/[0.08] text-xs">
          <div className="bg-[#070B0E] p-3.5 rounded-xl border border-white/[0.04]">
            <span className="text-[10px] uppercase tracking-wider text-sand-muted block font-sans-body">Frontend</span>
            <div className="text-ivory font-medium mt-1">Laravel Blade + Tailwind</div>
          </div>

          <div className="bg-[#070B0E] p-3.5 rounded-xl border border-white/[0.04]">
            <span className="text-[10px] uppercase tracking-wider text-sand-muted block font-sans-body">Backend & Auth</span>
            <div className="text-ivory font-medium mt-1">PHP 8.2 + Sanctum</div>
          </div>

          <div className="bg-[#070B0E] p-3.5 rounded-xl border border-white/[0.04]">
            <span className="text-[10px] uppercase tracking-wider text-sand-muted block font-sans-body">Database</span>
            <div className="text-ivory font-medium mt-1">PostgreSQL (JSONB)</div>
          </div>

          <div className="bg-[#070B0E] p-3.5 rounded-xl border border-white/[0.04]">
            <span className="text-[10px] uppercase tracking-wider text-sand-muted block font-sans-body">CI/CD & Cloud</span>
            <div className="text-ivory font-medium mt-1">GitHub Actions + Render</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto text-xs font-sans-body">
        <button
          onClick={() => setActiveTab('code')}
          className={`px-4 py-2 rounded-full tracking-wider transition ${
            activeTab === 'code'
              ? 'bg-sunset-coral text-white font-medium shadow-md shadow-sunset-coral/20'
              : 'bg-white/[0.04] text-sand-muted hover:text-ivory'
          }`}
        >
          Source Code Explorer
        </button>

        <button
          onClick={() => setActiveTab('sandbox')}
          className={`px-4 py-2 rounded-full tracking-wider transition ${
            activeTab === 'sandbox'
              ? 'bg-sunset-coral text-white font-medium shadow-md shadow-sunset-coral/20'
              : 'bg-white/[0.04] text-sand-muted hover:text-ivory'
          }`}
        >
          REST API Sandbox
        </button>

        <button
          onClick={() => setActiveTab('schema')}
          className={`px-4 py-2 rounded-full tracking-wider transition ${
            activeTab === 'schema'
              ? 'bg-sunset-coral text-white font-medium shadow-md shadow-sunset-coral/20'
              : 'bg-white/[0.04] text-sand-muted hover:text-ivory'
          }`}
        >
          PostgreSQL DB Schema
        </button>

        <button
          onClick={() => setActiveTab('devops')}
          className={`px-4 py-2 rounded-full tracking-wider transition ${
            activeTab === 'devops'
              ? 'bg-sunset-coral text-white font-medium shadow-md shadow-sunset-coral/20'
              : 'bg-white/[0.04] text-sand-muted hover:text-ivory'
          }`}
        >
          CI/CD & Render Deploy
        </button>
      </div>

      {/* TAB 1: CODE EXPLORER */}
      {activeTab === 'code' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* File Tree Sidebar */}
          <div className="bg-[#0B1014] border border-white/[0.06] rounded-2xl p-4 space-y-2 text-xs">
            <span className="text-[10px] uppercase tracking-wider text-sand-muted block mb-3 font-sans-body">
              Project File Tree
            </span>
            {Object.keys(fileContents).map((fileKey) => (
              <button
                key={fileKey}
                onClick={() => setSelectedFile(fileKey)}
                className={`w-full text-left px-3 py-2.5 rounded-xl font-mono text-xs transition flex items-center justify-between ${
                  selectedFile === fileKey
                    ? 'bg-sunset-coral/15 text-sunset-coral border border-sunset-coral/30 font-bold'
                    : 'text-sand-muted hover:text-ivory hover:bg-white/[0.03]'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <FileCode className="w-3.5 h-3.5 shrink-0 text-sand-muted" />
                  <span className="truncate">{fileKey}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Code Viewer */}
          <div className="md:col-span-3 bg-[#070B0E] border border-white/[0.06] rounded-2xl p-5 space-y-3 relative shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <span className="font-mono text-xs text-sunset-coral font-bold">
                {fileContents[selectedFile].label}
              </span>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.04] hover:bg-white/[0.08] text-ivory text-xs rounded-full border border-white/10 transition"
              >
                {copiedFile ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-sand-muted" />
                    <span>Copy File</span>
                  </>
                )}
              </button>
            </div>

            <pre className="overflow-x-auto text-xs font-mono text-ivory/90 leading-relaxed max-h-[500px] p-2">
              <code>{fileContents[selectedFile].code}</code>
            </pre>
          </div>
        </div>
      )}

      {/* TAB 2: REST API SANDBOX */}
      {activeTab === 'sandbox' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0B1014] border border-white/[0.06] rounded-2xl p-6 space-y-4 shadow-xl">
            <h3 className="font-serif-display text-xl text-ivory">API Request Builder</h3>

            <div>
              <label className="block text-xs uppercase tracking-wider text-sand-muted mb-1 font-sans-body">Endpoint</label>
              <select
                value={apiEndpoint}
                onChange={(e) => setApiEndpoint(e.target.value)}
                className="w-full bg-[#070B0E] border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-ivory font-mono focus:outline-none focus:border-sunset-coral"
              >
                <option value="POST /api/v1/auth/login">POST /api/v1/auth/login (Acquire Sanctum Token)</option>
                <option value="POST /api/v1/bookings">POST /api/v1/bookings (Create Booking Manifest)</option>
                <option value="GET /api/v1/bookings">GET /api/v1/bookings (List All Bookings)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-sand-muted mb-1 font-sans-body">Bearer Token</label>
              <input
                type="text"
                value={sanctumToken}
                onChange={(e) => setSanctumToken(e.target.value)}
                className="w-full bg-[#070B0E] border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-sand-muted font-mono"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-sand-muted mb-1 font-sans-body">Request JSON Payload</label>
              <textarea
                rows={5}
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
                className="w-full bg-[#070B0E] border border-white/[0.08] rounded-xl p-3 text-xs text-ivory font-mono focus:outline-none focus:border-sunset-coral"
              />
            </div>

            <button
              onClick={handleRunApiTest}
              disabled={isLoadingApi}
              className="w-full py-2.5 bg-sunset-coral hover:bg-[#D95339] text-white font-medium text-xs rounded-full shadow-lg shadow-sunset-coral/20 transition flex items-center justify-center gap-2"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{isLoadingApi ? 'Executing Request...' : 'Send API Test Request'}</span>
            </button>
          </div>

          <div className="bg-[#070B0E] border border-white/[0.06] rounded-2xl p-6 space-y-4 shadow-xl">
            <h3 className="font-serif-display text-xl text-ivory">API JSON Response</h3>
            <div className="bg-[#0B1014] border border-white/[0.04] p-4 rounded-xl max-h-[350px] overflow-y-auto">
              <pre className="text-xs font-mono text-emerald-400">
                {apiResponse ? JSON.stringify(apiResponse, null, 2) : '// Response will appear here after execution...'}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SCHEMA */}
      {activeTab === 'schema' && (
        <div className="bg-[#0B1014] border border-white/[0.06] rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
          <h3 className="font-serif-display text-2xl text-ivory">PostgreSQL Relational Schema Specification</h3>
          <p className="text-xs text-sand-muted font-light leading-relaxed">
            All tables are architected with native UUID primary keys, JSONB columns for flexible passenger manifests, and foreign key indexes for lightning-fast queries.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="bg-[#070B0E] p-4 rounded-xl border border-white/[0.04] space-y-2">
              <span className="text-xs font-mono text-sunset-coral font-bold block">1. bookings (Table)</span>
              <ul className="text-xs text-sand-muted space-y-1 font-mono font-light">
                <li>• id (UUID, PK)</li>
                <li>• booking_ref (VARCHAR, Unique)</li>
                <li>• customer (JSONB)</li>
                <li>• passengers (JSONB)</li>
                <li>• total_price (DECIMAL)</li>
                <li>• booking_status (VARCHAR)</li>
              </ul>
            </div>

            <div className="bg-[#070B0E] p-4 rounded-xl border border-white/[0.04] space-y-2">
              <span className="text-xs font-mono text-sunset-coral font-bold block">2. invoices (Table)</span>
              <ul className="text-xs text-sand-muted space-y-1 font-mono font-light">
                <li>• id (UUID, PK)</li>
                <li>• booking_id (UUID, FK)</li>
                <li>• total_amount (DECIMAL)</li>
                <li>• amount_paid (DECIMAL)</li>
                <li>• balance_due (DECIMAL)</li>
                <li>• payment_status (VARCHAR)</li>
              </ul>
            </div>

            <div className="bg-[#070B0E] p-4 rounded-xl border border-white/[0.04] space-y-2">
              <span className="text-xs font-mono text-sunset-coral font-bold block">3. tour_packages (Table)</span>
              <ul className="text-xs text-sand-muted space-y-1 font-mono font-light">
                <li>• id (UUID, PK)</li>
                <li>• code (VARCHAR, Unique)</li>
                <li>• title (VARCHAR)</li>
                <li>• price_per_pax (DECIMAL)</li>
                <li>• inclusions (JSONB)</li>
                <li>• itinerary (JSONB)</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: DEVOPS */}
      {activeTab === 'devops' && (
        <div className="bg-[#0B1014] border border-white/[0.06] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="space-y-2">
            <h3 className="font-serif-display text-2xl text-ivory">CI/CD Pipeline & Cloud Deployment Setup</h3>
            <p className="text-xs text-sand-muted font-light leading-relaxed">
              Step-by-step blueprint to connect your GitHub repository to automated testing and deploy seamlessly to Render Cloud or Railway.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-[#070B0E] p-4 rounded-xl border border-white/[0.04] space-y-2">
              <span className="text-xs font-sans-body uppercase tracking-wider text-sunset-coral font-medium">Step 1: Increase Composer Timeout (Local Machine)</span>
              <p className="text-xs text-sand-muted font-light">
                Run <code className="text-sunset-coral font-mono">composer config --global process-timeout 2000</code> to prevent slow Git checkout timeouts.
              </p>
            </div>

            <div className="bg-[#070B0E] p-4 rounded-xl border border-white/[0.04] space-y-2">
              <span className="text-xs font-sans-body uppercase tracking-wider text-sunset-coral font-medium">Step 2: Database Migration</span>
              <p className="text-xs text-sand-muted font-light">
                Run <code className="text-sunset-coral font-mono">php artisan migrate --seed</code> to bootstrap the tour packages and test operator account.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
