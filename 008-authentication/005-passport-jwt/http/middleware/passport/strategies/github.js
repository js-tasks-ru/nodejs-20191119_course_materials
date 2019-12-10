const config = require('config');
const GitHubStrategy = require('passport-github2');
const User = require('../../../../models/User');
const issueToken = require('../issueToken');

module.exports = new GitHubStrategy({
  clientID: config.get('auth.github.clientId'),
  clientSecret: config.get('auth.github.secret'),
  callbackURL: `http://localhost:${config.get('app.port')}/api/oauth/github/callback`,
  scope: ['user:email'],
}, async (ghAccessToken, ghRefreshToken, profile, done) => {
  try {
    const ghUser = {
      oauth: [{
        id: profile.id,
        provider: 'github',
        accessToken: ghAccessToken,
        refreshToken: ghRefreshToken,
      }],
      name: profile.displayName || profile.username,
      login: profile.username,
    };
    const user = await User.findOneAndUpdate({oauth: {$elemMatch: {provider: 'github', id: profile.id}}}, ghUser, {
      new: true,
      upsert: true
    });
    const [accessToken, refreshToken] = await issueToken(user);
    done(null, {
      user,
      accessToken,
      refreshToken,
    });
  } catch (e) {
    done(e)
  }
});
