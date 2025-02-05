const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('service.proto', {});
const proto = grpc.loadPackageDefinition(packageDefinition);

function sayHello(call, callback) {
  callback(null, { message: `from Node: Hello, ${call.request.name}!` });
}

function main() {
  const server = new grpc.Server();
  server.addService(proto.MyService.service, { SayHello: sayHello });
  server.bindAsync(
    '0.0.0.0:50051',
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
    },
  );
}

main();
