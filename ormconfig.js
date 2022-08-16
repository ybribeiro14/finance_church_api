module.exports = [
  {
    name: 'mongo',
    type: 'mongodb',
    url: process.env.MONGODB_URL,
    useNewUrlParser: true,
    synchronize: true,
    logging: true,
    useUnifiedTopology: true,
    entities: [`./${process.env.NODE_ENV === 'dev' ? 'src' : 'dist'}/models/schemas/*.${process.env.NODE_ENV === 'dev' ? 'ts' : 'js'}`],
  },
];
