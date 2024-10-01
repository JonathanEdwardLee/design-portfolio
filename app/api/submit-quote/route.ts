import { NextResponse } from 'next/server';
import dbConnect from '../../lib/mongodb';
import Quote from '../../models/Quote';
import { IncomingWebhook } from '@slack/webhook';

// Initialize the Slack webhook with your Slack Webhook URL
const slackWebhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL!);

export async function POST(req: Request) {
  try {
    await dbConnect();
    const quoteData = await req.json();
    const newQuote = new Quote(quoteData);
    await newQuote.save();

    // Send notification to Slack
    await slackWebhook.send({
      text: 'New Quote Submission',
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '*New Quote Submission*'
          }
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Name:*\n${quoteData.name}`
            },
            {
              type: 'mrkdwn',
              text: `*Email:*\n${quoteData.email}`
            },
            {
              type: 'mrkdwn',
              text: `*Project Type:*\n${quoteData.projectType}`
            },
            {
              type: 'mrkdwn',
              text: `*Project Details:*\n${quoteData.projectDetails}`
            }
          ]
        }
      ]
    });

    return NextResponse.json({ message: 'Quote submitted successfully' });
  } catch (error) {
    console.error('Error submitting quote:', error);
    return NextResponse.json({ error: 'Failed to submit quote' }, { status: 500 });
  }
}
