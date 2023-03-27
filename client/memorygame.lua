local open = false
local memoryGameQueue = {}

local function MemoryGame(callback, gameTime, amountOfAnswers, maxAnswersIncorrect, triggerEvent)
    if gameTime == nil then
        gameTime = 10
    end

    if not open then
        open = true

        -- Add game parameters to message queue
        table.insert(memoryGameQueue, {
            callback = callback,
            gameTime = gameTime,
            amountOfAnswers = amountOfAnswers,
            maxAnswersIncorrect = maxAnswersIncorrect,
            triggerEvent = triggerEvent or 'memorygame-callback'
        })

        -- If the message queue only contains one message, start the memory game
        if #memoryGameQueue == 1 then
            Citizen.SetTimeout(0, function()
                SendNUIMessage({
                    action = "newMemoryGame",
                    game = "MemoryGame",
                    gameTime = gameTime,
                    amountOfAnswers = amountOfAnswers,
                    maxAnswersIncorrect = maxAnswersIncorrect,
                    triggerEvent = triggerEvent or 'memorygame-callback'
                })
                SetNuiFocus(true, true)
            end)
        end
    end
end

RegisterNUICallback('memorygame-callback', function(data, cb)
    SetNuiFocus(false, false)
    local success = data.success
    local message = table.remove(memoryGameQueue, 1)

    if message then
        if success then
            message.callback(success)
        end

        -- If there are messages in the queue, start the next game
        if #memoryGameQueue > 0 then
            Citizen.SetTimeout(0, function()
                SendNUIMessage({
                    action = "newMemoryGame",
                    game = "MemoryGame",
                    gameTime = memoryGameQueue[1].gameTime,
                    amountOfAnswers = memoryGameQueue[1].amountOfAnswers,
                    maxAnswersIncorrect = memoryGameQueue[1].maxAnswersIncorrect,
                    triggerEvent = memoryGameQueue[1].triggerEvent
                })
                SetNuiFocus(true, true)
            end)
        else
            open = false
        end
    end

    cb('ok')
end)

exports("MemoryGame", MemoryGame)
