// src/index.ts
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3000;
app.use(bodyParser.json());

const dbFilePath = path.join(__dirname, 'db.json');

// Helper function to read data from the JSON file
const readData = (): any[] => {
  try {
    const data = fs.readFileSync(dbFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Helper function to write data to the JSON file
const writeData = (data: any[]) => {
  fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
};

// GET /ping - Always returns true
app.get('/ping', (req: Request, res: Response) => {
  res.status(200).send(true);
});

// POST /submit - Save a form submission
app.post('/submit', (req: Request, res: Response) => {
  console.log("am here")
  const { Name, Email, Phone, github_link, StopwatchTime } = req.body;

  // Validate input
  if (!Name || !Email || !Phone || !github_link || !StopwatchTime) {
    return res.status(400).send({ error: 'All the fields are required' });
  }

  // Create a new submission
  const newSubmission = { Name, Email, Phone, github_link, StopwatchTime };

  // Read existing data
  const submissions = readData();

  // Add the new submission
  submissions.push(newSubmission);

  // Write the updated data
  writeData(submissions);

  res.status(201).send(newSubmission);
});

// GET /read?index=<index> - Read a submission by index
app.get('/read', (req: Request, res: Response) => {
  const index = parseInt(req.query.index as string, 10);

  if (isNaN(index) || index < 0) {
    return res.status(400).send({ error: 'Invalid index' });
  }

  const submissions = readData();

  if (index >= submissions.length) {
    return res.status(404).send({ error: 'Index out of range' });
  }

  const submission = submissions[index];

  res.status(200).send(submission);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
