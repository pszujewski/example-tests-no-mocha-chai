// Code we want to test. 
// We want to make sure the data being returned from the spotify API meets our expectations
function makeQuery(name) {
  return { 
    q: name,
    limit: 1,
    type: "artist"
  };
}

function getArtistData(endpoint, query) {
    const url = new URL(`https://api.spotify.com/v1/${endpoint}`);
    Object.keys(query).forEach(key => { 
      url.searchParams.append(key, query[key])
    });
    return fetch(url).then(function(response) {
        return response.json();
    });
}

// We will handle our assertions with the following 
function assert(condition, message) {
  if (typeof condition === "boolean") {
    if (!condition) { throw new Error(`Condition failed: ${message}`); }
  }
  else {
    throw new Error('Condition is not a boolean');
  }
}

// Tests
// Test cases to test our assertations
function testOne() {
  let artistQuery = makeQuery('Alicia Keys');
  return getArtistData('search', artistQuery)
  .then(data => {
    assert(data.artists.items.length > 0, "no artists in results");
    assert(data.artists.items[0].name === artistQuery.q, "artist names do not match");
    assert(data.artists.items[0].type === 'artist', '"type" is not artist');
    console.log(data);  
  });
} 

function testTwo() {
  let artistQuery = makeQuery('Michael Jackson');
  return getArtistData('search', artistQuery)
  .then(data => {
    assert(data.artists.items.length > 0, "no artists in results");
    assert(data.artists.items[0].name === artistQuery.q, "artist names do not match"); 
    assert(data.artists.items[0].type === 'artist', '"type" is not artist');
    // console.log(data);  
  });
}

function testThree() {
  let artistQuery = makeQuery('Elvis Presley');
  return getArtistData('search', artistQuery)
  .then(data => {
    assert(data.artists.items.length > 0, "no artists in results");
    assert(data.artists.items[0].name === artistQuery.q, "artist names do not match"); 
    assert(data.artists.items[0].type === 'artist', '"type" is not artist');
    // console.log(data); 
  })
}

function testFour() {
  let artistQuery = makeQuery('James Brown');
  return getArtistData('search', artistQuery)
  .then(data => {
    assert(data.artists.items.length > 0, "no artists in results");
    assert(data.artists.items[0].name === artistQuery.q, "artist names do not match");
    assert(data.artists.items[0].type === 'artist', '"type" is not artist'); 
    //console.log(data);  
  })
}

// Test runner
// We will run our tests with the following function. 
function runTests(testCases) {
  testCases.forEach(testCase => {
    let success = true;
    testCase()
    .then(result => {
      console.log(`Success: ${testCase.name}`);
    })
    .catch(err => {
      console.error(err);
    });
  });
}

// Final step: run the tests
runTests([testOne, testTwo, testThree, testFour]);
