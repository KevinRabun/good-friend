import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import http from 'http';
import { createApp } from '../app';

let server: http.Server;
let baseUrl: string;

function get(path: string): Promise<{ status: number; body: any }> {
  return new Promise((resolve, reject) => {
    http.get(`${baseUrl}${path}`, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode!, body: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode!, body: data });
        }
      });
    }).on('error', reject);
  });
}

function post(path: string, body: any): Promise<{ status: number; body: any }> {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const url = new URL(`${baseUrl}${path}`);
    const req = http.request(
      { hostname: url.hostname, port: url.port, path: url.pathname, method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) } },
      (res) => {
        let resData = '';
        res.on('data', (chunk) => (resData += chunk));
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode!, body: JSON.parse(resData) });
          } catch {
            resolve({ status: res.statusCode!, body: resData });
          }
        });
      }
    );
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

beforeAll(async () => {
  const app = createApp();
  await new Promise<void>((resolve) => {
    server = app.listen(0, () => {
      const addr = server.address() as { port: number };
      baseUrl = `http://127.0.0.1:${addr.port}`;
      resolve();
    });
  });
});

afterAll(async () => {
  await new Promise<void>((resolve) => server.close(() => resolve()));
});

describe('API Integration Tests', () => {
  // Health
  it('GET /health returns ok', async () => {
    const { status, body } = await get('/health');
    expect(status).toBe(200);
    expect(body.status).toBe('ok');
  });

  // Affirmations
  it('GET /api/affirmations returns array', async () => {
    const { status, body } = await get('/api/affirmations');
    expect(status).toBe(200);
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
  });

  it('GET /api/affirmations/daily returns single affirmation', async () => {
    const { status, body } = await get('/api/affirmations/daily');
    expect(status).toBe(200);
    expect(body.id).toBeTruthy();
    expect(body.text).toBeTruthy();
  });

  it('GET /api/affirmations/themes returns themes', async () => {
    const { status, body } = await get('/api/affirmations/themes');
    expect(status).toBe(200);
    expect(body).toContain('peace');
  });

  it('GET /api/affirmations/theme/peace returns peace affirmations', async () => {
    const { status, body } = await get('/api/affirmations/theme/peace');
    expect(status).toBe(200);
    expect(body.every((a: any) => a.theme === 'peace')).toBe(true);
  });

  it('GET /api/affirmations/random returns an affirmation', async () => {
    const { status, body } = await get('/api/affirmations/random');
    expect(status).toBe(200);
    expect(body.text).toBeTruthy();
  });

  // Mindfulness
  it('GET /api/mindfulness returns all exercises', async () => {
    const { status, body } = await get('/api/mindfulness');
    expect(status).toBe(200);
    expect(body.length).toBeGreaterThan(0);
  });

  it('GET /api/mindfulness/exercise/br-1 returns specific exercise', async () => {
    const { status, body } = await get('/api/mindfulness/exercise/br-1');
    expect(status).toBe(200);
    expect(body.title).toBe('4-7-8 Breathing');
  });

  it('GET /api/mindfulness/exercise/nonexistent returns 404', async () => {
    const { status } = await get('/api/mindfulness/exercise/nonexistent');
    expect(status).toBe(404);
  });

  it('GET /api/mindfulness/short?maxMinutes=5 filters by duration', async () => {
    const { status, body } = await get('/api/mindfulness/short?maxMinutes=5');
    expect(status).toBe(200);
    for (const e of body) {
      expect(e.durationMinutes).toBeLessThanOrEqual(5);
    }
  });

  // Tolerance
  it('GET /api/tolerance returns prompts', async () => {
    const { status, body } = await get('/api/tolerance');
    expect(status).toBe(200);
    expect(body.length).toBeGreaterThan(0);
  });

  it('GET /api/tolerance/daily returns daily prompt', async () => {
    const { status, body } = await get('/api/tolerance/daily');
    expect(status).toBe(200);
    expect(body.prompt).toBeTruthy();
  });

  it('GET /api/tolerance/categories returns categories', async () => {
    const { status, body } = await get('/api/tolerance/categories');
    expect(status).toBe(200);
    expect(body).toContain('empathy-building');
  });

  // Kindness
  it('GET /api/kindness returns acts', async () => {
    const { status, body } = await get('/api/kindness');
    expect(status).toBe(200);
    expect(body.length).toBeGreaterThan(0);
  });

  it('GET /api/kindness/daily returns daily act', async () => {
    const { status, body } = await get('/api/kindness/daily');
    expect(status).toBe(200);
    expect(body.suggestion).toBeTruthy();
  });

  it('GET /api/kindness/scope/global returns global acts', async () => {
    const { status, body } = await get('/api/kindness/scope/global');
    expect(status).toBe(200);
    expect(body.every((k: any) => k.scope === 'global')).toBe(true);
  });

  it('GET /api/kindness/effort/small returns small effort acts', async () => {
    const { status, body } = await get('/api/kindness/effort/small');
    expect(status).toBe(200);
    expect(body.every((k: any) => k.effortLevel === 'small')).toBe(true);
  });

  // Wellness
  it('POST /api/wellness/checkin processes a check-in', async () => {
    const { status, body } = await post('/api/wellness/checkin', {
      mood: 3,
      feelings: ['calm', 'grateful'],
    });
    expect(status).toBe(200);
    expect(body.mood).toBe(3);
    expect(body.response.message).toBeTruthy();
  });

  it('POST /api/wellness/checkin validates mood', async () => {
    const { status } = await post('/api/wellness/checkin', { mood: 0, feelings: [] });
    expect(status).toBe(400);
  });

  it('POST /api/wellness/checkin validates feelings array', async () => {
    const { status } = await post('/api/wellness/checkin', { mood: 3, feelings: 'not-an-array' });
    expect(status).toBe(400);
  });

  it('POST /api/wellness/checkin with mood 1 recommends resources', async () => {
    const { status, body } = await post('/api/wellness/checkin', {
      mood: 1,
      feelings: ['anxious'],
    });
    expect(status).toBe(200);
    expect(body.response.resourcesRecommended).toBe(true);
  });

  it('GET /api/wellness/feelings returns feeling words', async () => {
    const { status, body } = await get('/api/wellness/feelings');
    expect(status).toBe(200);
    expect(body).toContain('grateful');
  });

  it('GET /api/wellness/moods returns mood descriptors', async () => {
    const { status, body } = await get('/api/wellness/moods');
    expect(status).toBe(200);
    expect(body).toHaveLength(5);
  });

  // Resources
  it('GET /api/resources returns all resources', async () => {
    const { status, body } = await get('/api/resources');
    expect(status).toBe(200);
    expect(body.length).toBeGreaterThan(0);
  });

  it('GET /api/resources/crisis returns 24/7 resources', async () => {
    const { status, body } = await get('/api/resources/crisis');
    expect(status).toBe(200);
    for (const r of body) {
      expect(r.available).toBe('24/7');
    }
  });

  it('GET /api/resources/region/United%20States returns US resources', async () => {
    const { status, body } = await get('/api/resources/region/United%20States');
    expect(status).toBe(200);
    expect(body.length).toBeGreaterThan(0);
  });

  // Daily Digest
  it('GET /api/daily returns combined daily content', async () => {
    const { status, body } = await get('/api/daily');
    expect(status).toBe(200);
    expect(body.affirmation).toBeTruthy();
    expect(body.perspectivePrompt).toBeTruthy();
    expect(body.kindnessAct).toBeTruthy();
    expect(body.message).toBeTruthy();
  });
});
