// this manages the inactivity of user, where they will get kicked out of session if inactive for 5 mins
function kickOut() {
    let remainingTime;

    function resetTime() {
        clearTimeout(remainingTime);
        remainingTime = setTimeout(getRektNerd(), 300000);
    };

    // these will keep the session active
    window.onload = resetTime();
    document.onmousemove = resetTime();
    
    function getRektNerd() {
        logout();
    };

};

// this calls the kickOut funtion upon loading page
window.onload = () => {
    kickOut();
};


  