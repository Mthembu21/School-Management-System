declare module 'sendCommunication' {
  const sendCommunication: (message: string, method: string, recipients: string) => Promise<any>;
  export default sendCommunication;
}
