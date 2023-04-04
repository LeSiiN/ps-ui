-- Variable to track whether a memory game is currently open
local open = false

-- Queue to store game parameters and callbacks for multiple concurrent games
local memoryGameQueue = {}

--[[
    Function to start a new memory game.

    Parameters:
        - callback: A function to be called upon completion of the memory game.
        - gameTime: (Optional) The length of the memory game in seconds (default is 10 seconds).
        - amountOfAnswers: The number of answers in the sequence to be remembered.
        - maxAnswersIncorrect: The maximum number of incorrect answers allowed before the game ends.
        - triggerEvent: (Optional) The name of the event to trigger when the game ends (default is 'memorygame-callback').

    Returns: none
]]
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
                    action = "MemoryGame",
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

--[[
    Callback function to handle completion of a memory game.

    Parameters:
        - data: A table containing information about the completed game.
        - cb: A callback function to be called upon completion of this function.

    Returns: none
]]
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

-- Function to export the Memory
exports("MemoryGame", MemoryGame)
