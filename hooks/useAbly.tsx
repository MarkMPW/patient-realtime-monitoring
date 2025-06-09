import { useState, useEffect } from 'react';
import * as Ably from 'ably';

export const useAbly = (channelName: string) => {
  const [channel, setChannel] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const realtimeClient = new Ably.Realtime({
      authUrl: "/api/ably-token",
    });

    const patientChannel = realtimeClient.channels.get(channelName);
    setChannel(patientChannel);
    
    realtimeClient.connection.on("connected", () => {
      console.log(`Connected to Ably channel: ${channelName}`);
      setIsConnected(true);
    });

    realtimeClient.connection.on("disconnected", () => {
      setIsConnected(false);
    });

    return () => {
      patientChannel.detach();
      realtimeClient.close();
    };
  }, [channelName]);

  return { channel, isConnected };
}; 