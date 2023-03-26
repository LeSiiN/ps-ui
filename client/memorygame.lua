local open = false

RegisterNUICallback('memorygame-callback', function(data, cb)
    SetNuiFocus(false, false)
    Callback(data.success)
    open = false
    cb('ok')
end)

local function MemoryGame(callback, gameTime, amountOfAnswers, maxAnswersIncorrect, triggerEvent)
    if time == nil then
        time = 10
    end
    if not open then
        Callback = callback
        open = true
        SendNUIMessage({
            action = "newMemoryGame",
            gameTime = gameTime,
            amountOfAnswers = amountOfAnswers,
            maxAnswersIncorrect = maxAnswersIncorrect,
            triggerEvent = triggerEvent
        })
        SetNuiFocus(true, true)
    end
end

exports("MemoryGame", MemoryGame)
