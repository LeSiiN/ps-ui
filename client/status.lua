local function StatusShow(title, description, values)
    SendNUIMessage({
        action = "ShowStatusBar",
        title = title,
        description = description,
        values = values
    })
end

local function StatusHide()
    SendNUIMessage({
        action = "hideUi"
    })
end

local function StatusUpdate(title, description, values)
    SendNUIMessage({
        action = "UpdateStatusBar",
        title = title,
        description = description,
        values = values
    })
end

exports("StatusShow", StatusShow)
exports("StatusHide", StatusHide)
exports("StatusUpdate", StatusUpdate)
