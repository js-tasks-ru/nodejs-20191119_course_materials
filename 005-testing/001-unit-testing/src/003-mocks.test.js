const {expect} = require('chai');
const axios = require('axios');
const sinon = require('sinon');

const APIClient = require('./003-mocks');

const getRandomPhotoResponse = () => ({
  "id": "Dwu85P9SOIk",
  "created_at": "2016-05-03T11:00:28-04:00",
  "updated_at": "2016-07-10T11:00:01-05:00",
  "width": 2448,
  "height": 3264,
  "color": "#6E633A",
  "downloads": 1345,
  "likes": 24,
  "liked_by_user": false,
  "description": "A man drinking a coffee.",
  "exif": {
    "make": "Canon",
    "model": "Canon EOS 40D",
    "exposure_time": "0.011111111111111112",
    "aperture": "4.970854",
    "focal_length": "37",
    "iso": 100
  },
  "location": {
    "city": "Montreal",
    "country": "Canada",
    "position": {
      "latitude": 45.4732984,
      "longitude": -73.6384879
    }
  },
  "current_user_collections": [
    {
      "id": 206,
      "title": "Makers: Cat and Ben",
      "published_at": "2016-01-12T18:16:09-05:00",
      "updated_at": "2016-07-10T11:00:01-05:00",
      "curated": false,
      "cover_photo": null,
      "user": null
    },
  ],
  "urls": {
    "raw": "https://images.unsplash.com/photo-1417325384643-aac51acc9e5d",
    "full": "https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg",
    "regular": "https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=1080&fit=max",
    "small": "https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=400&fit=max",
    "thumb": "https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=200&fit=max"
  },
  "links": {
    "self": "https://api.unsplash.com/photos/Dwu85P9SOIk",
    "html": "https://unsplash.com/photos/Dwu85P9SOIk",
    "download": "https://unsplash.com/photos/Dwu85P9SOIk/download",
    "download_location": "https://api.unsplash.com/photos/Dwu85P9SOIk/download"
  },
  "user": {
    "id": "QPxL2MGqfrw",
    "updated_at": "2016-07-10T11:00:01-05:00",
    "username": "exampleuser",
    "name": "Joe Example",
    "portfolio_url": "https://example.com/",
    "bio": "Just an everyday Joe",
    "location": "Montreal",
    "total_likes": 5,
    "total_photos": 10,
    "total_collections": 13,
    "instagram_username": "instantgrammer",
    "twitter_username": "crew",
    "links": {
      "self": "https://api.unsplash.com/users/exampleuser",
      "html": "https://unsplash.com/exampleuser",
      "photos": "https://api.unsplash.com/users/exampleuser/photos",
      "likes": "https://api.unsplash.com/users/exampleuser/likes",
      "portfolio": "https://api.unsplash.com/users/exampleuser/portfolio"
    }
  }
});

describe('APIClient', () => {
  describe('getRandomPhoto', () => {

    it('should return random photo data', async () => {
      const clientId = 'clientId';
      const requestMock = sinon.mock(axios)
        .expects('request')
        .once()
        .resolves(getRandomPhotoResponse());

      const client = new APIClient(clientId, axios);

      const result = await client.getRandomPhoto();

      expect(result)
        .to.have.nested.property('urls.raw')
        .that.equal(getRandomPhotoResponse().urls.raw);

      const [options] = requestMock.firstCall.args;

      expect(options)
        .to.have.nested.property('headers.authorization')
        .that.contains(clientId);

      requestMock.verify();
    });

    it('should return an error if any', async () => {
      const clientId = 'clientId';
      const error = new Error('Unauthorized');
      error.response = {
        status: 401,
      };

      const http = {
        request: sinon.stub()
          .onFirstCall().rejects(error)
        // request: () => Promise.reject(error)
      };

      const client = new APIClient(clientId, http);

      // let err;
      // try {
      //   await client.getRandomPhoto();
      // } catch (e) {
      //   err = e;
      //   // expect(err).to.have.nested.property('response.status', 401)
      // }
      // expect(err).to.have.nested.property('response.status', 401)

      await expect(client.getRandomPhoto()).to.be.eventually.rejectedWith(Error); // instanceof
      // await expect(client.getRandomPhoto()).to.be.eventually.rejectedWith('Unauthorized');
    });

  });
});


