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
      text: 'New Quote Request',
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '*New Quote Request*'
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
              text: `*Phone:*\n${quoteData.phone || 'Not provided'}` // Updated to include phone
            },
            {
              type: 'mrkdwn',
              text: `*Description:*\n${quoteData.description}`
            }
          ]
        }
      ]
    });

    return NextResponse.json({ message: 'Quote request submitted successfully' });
  } catch (error) {
    console.error('Error submitting quote:', error);
    return NextResponse.json({ error: 'Failed to submit quote request' }, { status: 500 });
  }
}
