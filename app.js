const express = require('express');
const got = require('got');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static('public'));
app.use('/', express.static(__dirname + '/public'));
let result = [
  {
    key: '001',
    date: '2021.07.30',
    time: '19:30',
    remainSeat: [],
  },
  {
    key: '004',
    date: '2021.08.01',
    time: '14:00',
    remainSeat: [],
  },
  {
    key: '007',
    date: '2021.08.04',
    time: '15:00',
    remainSeat: [],
  },
  {
    key: '010',
    date: '2021.08.06',
    time: '14:00',
    remainSeat: [],
  },
  {
    key: '013',
    date: '2021.08.08',
    time: '14:00',
    remainSeat: [],
  },
  {
    key: '016',
    date: '2021.08.11',
    time: '15:00',
    remainSeat: [],
  },
  {
    key: '019',
    date: '2021.08.13',
    time: '19:30',
    remainSeat: [],
  },
  {
    key: '022',
    date: '2021.08.15',
    time: '14:00',
    remainSeat: [],
  },
  {
    key: '024',
    date: '2021.08.17',
    time: '19:30',
    remainSeat: [],
  },
  {
    key: '027',
    date: '2021.08.19',
    time: '19:30',
    remainSeat: [],
  },
  {
    key: '030',
    date: '2021.08.21',
    time: '18:30',
    remainSeat: [],
  },
];

async function getData(url) {
  return await request.get(url);
}

app.get('/reservation', async (req, res) => {
  try {
    for (let i = 0; i < result.length; i++) {
      let url = `https://api-ticketfront.interpark.com/v1/goods/21005689/playSeq/PlaySeq/${result[i].key}/ALL`;

      const response = await got(url);
      let data = JSON.parse(response.body);

      // Casting 채우기
      result[i].casting = [];
      for (let j = 0; j < data.data.casting.length; j++) {
        result[i].casting.push(data.data.casting[j].manName);
      }

      // remainSeat 채우기
      result[i].remainSeat = data.data.remainSeat;
    }
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
