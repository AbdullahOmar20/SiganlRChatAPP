using Microsoft.AspNetCore.SignalR;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        public void sendMessage(string user, string message)
        {
            Clients.All.SendAsync("receiveMessage", user, message);
        }
    }
}