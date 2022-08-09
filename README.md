# API Advisor

```json
"baseURL": "https://csgo-dashboard-rank.herokuapp.com"
```
---
## Summary
- [Players](#players)
  - [Register players](#register-players)
  - [Register a player with an params](#player-parms)
  - [Register a player without an http](#player-http)
  - [Errors](#errors-players)
    - [Register a player with an incorrect url](#register-player-with-incorrect-url)
    - [Register a already existing player](#player-added)
    - [Register a player that was not found](#player-found)
  - [Display all registered players](#display-players)
- [Matches](#matches) 
  - [Register matches](#register-matches)
  - [Register a match with an params](#match-parms)
  - [Register a match without an http](#match-http)
  - [Errors](#errors-matches)
    - [Register match with an incorrect url](#register-match-with-incorrect-url)
    - [Register an already existing match](#register-already-match)
    - [Register a match that was not found](#match-found)
  - [Display all registered matches](#display-match)
- [Ranks](#ranks)
  - [Kills](#rank-kills-sorted)
    - [Query params](#query-params)
      - [Display all kills with match url](#rank-kills-match_url)

---
## <center>**Players** <a id="players"></a></center>
---

### Register players <a id="register-players"></a>

```
POST - /api/players/
```
Register a player into the database

**Body:**
```json
{
  "url": "https://csgostats.gg/player/76561198062653475"
}
```
**Response:**
```
HTTP: 200 - OK
```

```json
{
  "playerId": "850fde80-8231-452t-b39c-f9b23695385a",
  "player": "SK|Blavold",
  "imageUrl": "https://avatars.akamai.steamstatic.com/e66064d13f75fe43da64fce740ac29a217f9fd6a_full.jpg",
  "platformCredentials": [
  {
    "platformName": "CSGOSTATS",
    "platformPlayerId": "76561198062653475"
  }
 ]
}
```
<a id='player-parms'></a>
<details>
<summary>Register a player with an params</summary>

**Body:**
```json
{
  "url": "https://csgostats.gg/player/76561198070867450#asdasd"
}
```

**Response:**
```
HTTP: 409 - CONFLICT
```
```json
{
  "playerId": "850fde80-8231-452t-b39c-f9b23695385a",
  "player": "SK|Blavold",
  "imageUrl": "https://avatars.akamai.steamstatic.com/e66064d13f75fe43da64fce740ac29a217f9fd6a_full.jpg",
  "platformCredentials": [
  {
    "platformName": "CSGOSTATS",
    "platformPlayerId": "76561198062653475"
  }
 ]
}
```
</details>

<a id="player-http"></a>
<details>
<summary>Register a player without an http</summary>

**Body:**
```json
{
  "url": "csgostats.gg/player/76561198078984994/esea"
}
```
**Response:**
```
HTTP: 409 - CONFLICT
```
```json
{
  "playerId": "850fde80-8231-452t-b39c-f9b23695385a",
  "player": "SK|Blavold",
  "imageUrl": "https://avatars.akamai.steamstatic.com/e66064d13f75fe43da64fce740ac29a217f9fd6a_full.jpg",
  "platformCredentials": [
  {
    "platformName": "CSGOSTATS",
    "platformPlayerId": "76561198062653475"
  }
 ]
}
```
</details>

<a id="errors-players"></a>
**Errors**

<a id="register-player-with-incorrect-url"></a>
<details>
<summary>Register a player with an incorrect url</summary>

**Body:**
```json
{
  "url": "https://csgostats.gg/matches/76561198382398436"
}
```
**Response:**
```
HTTP: 400 - BAD REQUEST
```
```json
{
  "status": "error",
  "code": 400,
  "message": {
    "error": "Invalid url received"
  }
}
```
</details>

<a id="player-added"></a>
<details>
<summary>Register a already existing player</summary>

**Body:**
```json
{
  "url": "https://csgostats.gg/player/76561198070867450"
}
```
**Response:**
```
HTTP: 409 - CONFLICT
```
```json
{
  "status": "error",
  "code": 409,
  "message": {
  "error": "A player with that platform id has already been registered."
  }
}
```
</details>

<a id="player-found"></a>
<details>
<summary>Register a player that was not found</summary>

**Body:**
```json
{
  "url": "https://csgostats.gg/player/9999999999999999999#adads"
}
```
**Response:**
```
HTTP: 404 - NOT FOUND
```
```json
{
  "status": "error",
  "code": 404,
  "message": {
  "error": "Player not found."
  }
}
```

</details>

<a id="display-players"></a>
**Display players**

<details>
<summary>Display all registered players</summary>

```
GET - /api/players/
```

**Responde:**
```
HTTP: 200 - OK
```
```json
[
  {
    "playerId": "76561198070867450",
    "player": "marcelosj",
    "imageUrl": "https://avatars.akamai.steamstatic.com/23077149f02c6225f07f658380aa7fc364fa701f_full.jpg"
  },
  {
    "playerId": "76561198062653475",
    "player": "SK|Blavold",
    "imageUrl": "https://avatars.akamai.steamstatic.com/e66064d13f75fe43da64fce740ac29a217f9fd6a_full.jpg"
  },
  {
    "playerId": "76561198034937219",
    "player": "HeavyFire",
    "imageUrl": "https://avatars.akamai.steamstatic.com/721c61c6b88439322fccf27f13e697d9eeaf73da_full.jpg"
  }
]
```

</details>

---
## <center>**Matches** <a id="matches"></a></center>
---
### Register matches <a id="register-matches"></a>

```
POST - /api/matches/
```

Register a match into the database and also register all registered players stats from that match

**Body:**
```json
{
  "url": "https://csgostats.gg/match/72090725"
}
```
**Response:**
```
HTTP: 200 - OK
```
```json
{
  "platform": "CSGOSTATS",
  "platformMatchId": "72090725",
  "matchUrl": "https://csgostats.gg/match/72090725",
  "mapName": "de_mirage",
  "date": "2022-07-14T01:03:32.000Z",
  "scoreboard": {
    "team1Rounds": 15,
    "team2Rounds": 15
},
  "players": [
    {
     "player": "SK|Blavold",
     "team": "team2",
     "kills": 40,
     "deaths": 18,
     "assists": 1,
     "killDeathDifference": 22,
     "killDeathRatio": 2.2,
     "averageDamagePerRound": 124.7,
     "headshotPercentage": 0.4,
     "kast": 0.8,
     "enemiesFlashed": 22,
     "flashAssists": 1,
     "enemiesBlindTime": 55.9,
     "utilityDamage": 70,
     "clutch1vx": 1,
     "tradeKills": 10,
     "multikills": {
       "_1k": 13,
       "_2k": 5,
       "_3k": 3,
       "_4k": 2,
       "_5k": 0
      }
    }
  ]
}
```

<a id="match-parms"></a>
<details>
<summary>Register a match with an params</summary>

**Body:**
```json
{
  "url": "https://csgostats.gg/match/73079030#asdasd"
}
```

**Response:**
```
HTTP: 200 - OK
```
```json
{
  "platformMatchId": "73079030",
  "platform": "CSGOSTATS",
  "matchUrl": "https://csgostats.gg/match/73079030",
  "mapName": "de_inferno",
  "date": "2022-07-23T22:43:18.000Z",
  "scoreboard": {
    "team1Rounds": 4,
    "team2Rounds": 9
  },
  "players": []
}
```

</details>


<a id="match-http"></a>
<details>
<summary>Register a match without an http</summary>

**Body:**
```json
{
  "url": "csgostats.gg/match/73179029/esea"
}
```

**response:**
```
HTTP: 200 - OK
```
```json
{
  "platformMatchId": "73179029",
  "platform": "CSGOSTATS",
  "matchUrl": "https://csgostats.gg/match/73179029",
  "mapName": "de_mirage",
  "date": "2022-07-24T17:31:02.000Z",
  "scoreboard": {
    "team1Rounds": 10,
    "team2Rounds": 16
  },
  "players": []
}
```



</details>

<a id="errors-matches"></a>
**Errors**


<a id="register-match-with-incorrect-url"></a>
<details>
<summary>Register match with an incorrect url</summary>

**Body:**
```json
{
  "url": "https://csgostats.gg/matches/72090725"
}
```
**Response:**
```
HTTP: 400 - BAD REQUEST
```
```json
{
  "status": "error",
  "code": 400,
  "message": {
    "error": "Invalid url received"
  }
}
```
</details>

<a id="register-already-match"></a>
<details>
<summary>Register an already existing match</summary>

**Body:**
```json
{
  "url": "https://csgostats.gg/match/72090725"
}
```
**Response:**
```
HTTP: 409 - CONFLICT
```
```json
{
  "status": "error",
  "code": 409,
  "message": {
    "match": "A match with that id was already registered."
  }
}
```
</details>


<a id="match-found"></a>
<details>
<summary>Register a match that was not found</summary>

**Body:**
```json
{
  "url": "https://csgostats.gg/match/999999999"
}
```

**Response:**
```
HTTP: 404 - NOT FOUND
```
```Json
{
  "status": "error",
  "code": 404,
  "message": {
    "error": "Match not found."
  }
}
```

</details>


<a id="display-match"></a>
**Display matches**

<details>
<summary>Display all registered matches</summary>

```
GET - /api/matches/
```

**Response:**

```json
[
  {
    "platformMatchId": "73079023",
    "platform": "CSGOSTATS",
    "matchUrl": "https://csgostats.gg/match/73079023",
    "mapName": "de_inferno",
    "date": "2022-07-24T00:42:30.000Z",
    "scoreboard": {
      "team1Rounds": 16,
      "team2Rounds": 12
    }
  },
  {
    "platformMatchId": "73434211",
    "platform": "CSGOSTATS",
    "matchUrl": "https://csgostats.gg/match/73434211",
    "mapName": "de_mirage",
    "date": "2022-07-28T01:44:59.000Z",
    "scoreboard": {
      "team1Rounds": 13,
      "team2Rounds": 16
    }
  },
  {
    "platformMatchId": "73079032",
    "platform": "CSGOSTATS",
    "matchUrl": "https://csgostats.gg/match/73079032",
    "mapName": "de_ancient",
    "date": "2022-07-24T07:25:18.000Z",
    "scoreboard": {
      "team1Rounds": 5,
      "team2Rounds": 16
    }
  }
]
```
</details>

---
## <center>**Ranks** <a id="ranks"></a></center>
---


###Kills
<a id="rank-kills-sorted"></a>


Display the number of kills from the higher to the lower amount

```
GET - /api/ranks/kills/
```

Display the number of kills from all the registered players sorted from the higher to the lower amount

**Response:**
```
HTTP: 200 - OK
```
```json
[
  {
    "name": "SK|Blavold",
    "kills": 40,
  },
  {
    "name": "SK|Blavold",
    "kills": 40,
  },
  {
    "name": "SK|Blavold",
    "kills": 35,
  },
  {
    "name": "SK|Blavold",
    "kills": 33,
  },
  {
    "name": "Braves",
    "kills": 32,
  },
  {
    "name": "SK|Blavold",
    "kills": 32,
  },
  {
    "name": "SK|Blavold",
    "kills": 30,
  }
]
```


**Query params**<a id="query-params"></a>

<details>
<a id="rank-kills-match_url"></a>
<summary>Display all kills with match url</summary>

```
GET - /api/ranks/kills/?match_url
```
Display the number of kills from all the registered players with a match url for the match that registered that amount of kills 

**Response:**
```
HTTP: 200 - OK
```
```json
[
  {
    "name": "SK|Blavold",
    "kills": 40,
    "matchUrl": "https://csgostats.gg/match/72090725"
  },
  {
    "name": "SK|Blavold",
    "kills": 40,
    "matchUrl": "https://csgostats.gg/match/52659096"
  },
  {
    "name": "SK|Blavold",
    "kills": 35,
    "matchUrl": "https://csgostats.gg/match/73079023"
  },
  {
    "name": "SK|Blavold",
    "kills": 33,
    "matchUrl": "https://csgostats.gg/match/58067130"
  },
  {
    "name": "Braves",
    "kills": 32,
    "matchUrl": "https://csgostats.gg/match/72965812"
  },
  {
    "name": "SK|Blavold",
    "kills": 32,
    "matchUrl": "https://csgostats.gg/match/58067113"
  },
  {
    "name": "SK|Blavold",
    "kills": 30,
    "matchUrl": "https://csgostats.gg/match/73434211"
  }
]
```
</details>


