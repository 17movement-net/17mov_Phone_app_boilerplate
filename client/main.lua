function RegisterApp()
    local resourceName = GetCurrentResourceName()
    local url = GetResourceMetadata(resourceName, "ui_page", 0)

    exports['17mov_Phone']:AddApplication({
        name = Config.AppName or "testapp",
        label = "Test App",
        ui = url:find("http") and url or ("https://cfx-nui-%s/%s"):format(resourceName, url),
        icon = url:find("http") and ("%s/icon.svg"):format(url) or
            ("https://cfx-nui-%s//ui/dist/icon.svg"):format(resourceName),
        iconBackground = {
            angle = 135,
            colors = { '#7DA6FF', '#1A63FF' },
        },
        default = false,
        preInstalled = true,
        resourceName = resourceName,
        rating = 4.5,
    })
end

CreateThread(function()
    if GetResourceState("17mov_Phone") == "started" then
        RegisterApp()
    end
end)


RegisterNetEvent("17mov_Phone:Client:Ready", function()
    RegisterApp()
end)

if Config.DevMode then
    AddEventHandler('onResourceStop', function(resourceName)
        if resourceName == GetCurrentResourceName() then
            exports['17mov_Phone']:RemoveApplication({
                name = Config.AppName or "testapp",
                resourceName = resourceName,
            })
        end
    end)
end