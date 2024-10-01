import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/mongodb';
import Lead from '../../models/Lead';
import { IncomingWebhook } from '@slack/webhook';

const slackWebhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await dbConnect();

      const lead = new Lead(req.body);
      await lead.save();

      // Send Slack notification
      await slackWebhook.send({
        text: `New quote generated for ${lead.projectType}. Check details: ${lead.name}, ${lead.email}`,
      });

      console.log('Quote submitted to MongoDB:', lead);

      res.status(201).json({ success: true, message: 'Quote submitted successfully' });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Error submitting quote' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}