const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('service.proto', {});
const proto = grpc.loadPackageDefinition(packageDefinition);

function main() {
  const client = new proto.MyService(
    'localhost:50051',
    grpc.credentials.createInsecure(),
  );
  client.SayHello({ name: 'nodejs!' }, (err, response) => {
    if (err) console.error(err);
    else console.log(`Client received: ${response.message}`);
  });
}

main();
