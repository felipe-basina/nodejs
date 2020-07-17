const redis = require('redis');
const client = redis.createClient();
client.AUTH('Acesso01!');

function hash() {
    const key = 'frameworks';
    client.hmset(key, 'javascript', 'AngularJS', 'css', 'Bootstrap', 'node', 'Express');
    client.hgetall(key, function(error, object) {
        console.log('\nRetrieving values from <hgetall>');
        console.log(object);
    });
}

function setAndGet(key, value) {
    console.log(`\nSetting value ${value} to key ${key}`);
    client.set(key, value);
    //getAllKeys();
    client.get(key, function(error, value) {
        console.log(`Retrieving value from ${key}: ${value}`);
    });
}

function getAllKeys() {
    client.keys('*', function (err, keys) {
        if (err) return console.log(err);
        for(var i = 0, len = keys.length; i < len; i++) {
            console.log(keys[i]);
        }
    });
}

function runSampleFuctions() {
    setAndGet('project', 'NodeJS + Redis');
    hash();
}

client.on('connect', function() {
    console.log('Connect to the Redis server!');
    runSampleFuctions();
});

