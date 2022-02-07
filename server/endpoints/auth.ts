import { Request } from 'express';
import { OAuth2Client } from 'google-auth-library';
import app from '../app';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

app.post('/sign-in', async (req: Request<{}, {}, { token: string }>, res) => {
  const { token } = req.body;

  const client = new OAuth2Client(CLIENT_ID);

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (payload.aud.includes(CLIENT_ID)) {
    const userId = payload.sub;

    req.session.userId = userId;

    return req.session.save(() => res.json(req.session));
  }
  return res.sendStatus(401);
});
