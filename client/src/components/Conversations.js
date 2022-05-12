import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts";
import {
  getConversationWithUserId,
  getConversations,
  getUserDetails,
  sendMessageToUser,
  markAllMesssaageUnread
} from "../utilities/api/conversation";
import { DisplayPicture } from "./DisplayPicture";

export const Conversations = () => {
  const context = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageUser, setMessageUser] = useState({});
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    setMessageUser({});
    setMessages([]);

    getConversations()
      .then(({ data }) => {
        if (!data.count) {
          context.setUnReadConversations(0);
          return
        }
        setConversations(data.conversations);
        unReadCount = 0;
        data.conversations.map((conversation) => {
          unReadCount += conversation.unreadMsg;
        });
        context.setUnReadConversations(unReadCount);
      })
      .catch(() => {});
    
    if (context.showMessages && context.messageUserId) {
      getConversationWithUserId(context.messageUserId)
        .then(({ data }) => {
          if (data.count)
            setMessages(data.messages)
          
          markAllMesssaageUnread(context.messageUserId)
            .then(({ data }) => {
              context.setUnReadConversations(context.unReadConversations - data.totalUnread)
            })
            .catch(() => alert("Not able to mark message as read."));
        })
        .catch(() => alert("Error while getting conversations."));
      
      getUserDetails(context.messageUserId)
        .then(({ data }) => {
          setMessageUser(data)
        })
        .catch(() => alert("Error while getting user data."));
    }
  }, [context.messageUserId])

  const sendMessage = () => {
    if (!newMessage) return;

    sendMessageToUser(newMessage, context.messageUserId)
      .then(() => {
        const message = {
          from_user_id: context.auth.id,
          to_user_id: context.messageUserId,
          message: newMessage,
          timestamp: new Date().toISOString(),
          is_read: 0,
        };
        setMessages([ ...messages, message ]);
        setNewMessage("");
      })
      .catch(() => alert("Error while sending message."));
  }

  if (!context.showMessages)
    return null;
  
  return (
    <div className="fixed bottom-20 right-20 z-10 bg-gray-200 rounded-2xl w-96">
      {!context.messageUserId ? (
        <div className="relative">
          <div className="absolute right-3 top-2">
            <FontAwesomeIcon
              icon={faCircleXmark}
              size="lg"
              color="red"
              onClick={() => {
                context.setShowMessages(false);
                context.setMessageUserId(null);
                setMessages([]);
                setMessageUser({});
                setNewMessage("");
              }}
              className="cursor-pointer hover:scale-110"
            />
          </div>
          <div className="px-5 py-10">
            <h1 className="text-2xl text-center">Conversations</h1>
            <div className="max-h-50v overflow-y-auto">
              {conversations.map((conversation, index) => (
                <div
                  className="relative w-full mt-5 px-5"
                  onClick={() => {
                    context.setMessageUserId(conversation.user_id)
                  }}
                  key={index}
                >
                  <div className="flex items-center bg-gray-300 rounded-2xl w-full cursor-pointer py-2 px-5">
                    <div className="bg-gray-400 rounded-full h-16 w-16">
                      <DisplayPicture
                        displayPicture={conversation.display_picture}
                        size="2x"
                        boxSize={16}
                      />
                    </div>
                    <p className="text-lg ml-5">{conversation.employee_name}</p>
                  </div>
                  {!conversation.unreadMsg ? null : (
                    <span className="flex absolute -top-2 right-3">
                      <span className="bg-sky-500 rounded-full px-2 py-1">{conversation.unreadMsg}</span>
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-between">
          <div className="flex items-center bg-gray-300 rounded-t-2xl w-full px-4 py-3">
            <FontAwesomeIcon
              icon={faArrowLeft}
              size="lg"
              onClick={() => {
                context.setMessageUserId(null);
                setMessages([]);
                setMessageUser({});
                setNewMessage("");
              }}
              className="cursor-pointer"
            />
            <div className="bg-gray-400 rounded-full h-8 w-8 ml-5">
              <DisplayPicture
                displayPicture={messageUser.display_picture}
                size="lg"
                boxSize={8}
              />
            </div>
            <p className="ml-5">{messageUser.employee_name}</p>
          </div>
          <div>
            <div className="flex items-end min-h-40">
              <div className="max-h-50v w-full overflow-y-auto">
                {messages.map((message, index) => (
                  <div
                    className={`flex ${
                      message.from_user_id === context.messageUserId
                        ? "justify-start"
                        : "justify-end"
                    } w-full px-2`}
                    key={index}
                  >
                    <div className="bg-gray-300 rounded-xl w-70per p-1 m-1">
                      <p>{message.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key == "Enter")
                    sendMessage();
                }}
                className="bg-gray-300 rounded-2xl w-full m-2 p-2"
              />
              <FontAwesomeIcon
                icon={faCircleChevronRight}
                size="2x"
                color="green"
                className="cursor-pointer m-2"
                onClick={sendMessage}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
