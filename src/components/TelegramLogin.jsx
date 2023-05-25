import React, { useEffect } from 'react';

function TelegramLogin() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://telegram.org/js/telegram-widget.js?22";
        script.async = true;
        script.dataset.telegramLogin = "Monitoringtoolsbot";
        script.dataset.size = "large";
        script.dataset.onauth = "onTelegramAuth(user)";
        script.dataset.requestAccess = "write";
        document.body.appendChild(script);

        window.onTelegramAuth = (user) => {
            alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
        };

        return () => {
            document.body.removeChild(script);
            delete window.onTelegramAuth;
        }
    }, []);

    return (
        
        <div id="telegram-login"></div>
    )
}

export default TelegramLogin;
