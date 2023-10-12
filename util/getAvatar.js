const gravatar = require('gravatar');

// Define a utility function to generate avatars
function getAvatar(email, size = 200) {
  // Gravatar options
  const options = {
    s: size.toString(),  // Size in pixels
    r: 'pg',   // Rating (g, pg, r, x)
    d: 'identicon', // Default image if email has no Gravatar (identicon, monsterid, wavatar, retro, robohash)
  };

  // Generate the Gravatar URL
  const gravatarUrl = gravatar.url(email, options, true);

  return gravatarUrl;
}
module.exports = {getAvatar}
