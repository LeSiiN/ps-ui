local function SetDisplay(bool, img)
    SetNuiFocus(bool, bool)
    SendNUIMessage({
        action = "showImage",
        status = bool,
        image = img
    })
end

local function ShowImage(img)
    SetDisplay(true, img)
end

RegisterNUICallback("showItemImage-callback", function(data, cb)
    SetDisplay(false)
    cb('ok')
end)

exports("ShowImage", ShowImage)
