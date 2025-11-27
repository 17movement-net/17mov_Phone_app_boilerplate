Core.NuiLoaded = false

Core.SendNuiMessage = function(action, payload)
    while not Core.NuiLoaded do
        Wait(100)
    end

    SendNUIMessage({
        action = action,
        payload = payload
    })
end

RegisterNUICallback('Core:NuiLoaded', function(data, cb)
    Core.NuiLoaded = true
    Core.SendNuiMessage("Language:Initialize", {
        defaultLang = Config.Lang,
        languages = Core.GetLanguages(),
    })
    cb({})
end)

RegisterNUICallback("Core:GetLanguage", function(body, cb)
    cb(Core.GetLanguage(body.lang))
end)