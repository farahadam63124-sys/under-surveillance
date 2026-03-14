namespace SpriteKind {
    export const UI = SpriteKind.create()
    export const ScreenCam = SpriteKind.create()
    export const Camera = SpriteKind.create()
    export const CameraSight = SpriteKind.create()
    export const Heistable = SpriteKind.create()
    export const CursorKind = SpriteKind.create()
    export const Totem = SpriteKind.create()
    export const Smoke = SpriteKind.create()
    export const Finale = SpriteKind.create()
}
namespace StatusBarKind {
    export const Ability = StatusBarKind.create()
    export const Effect = StatusBarKind.create()
}
function StatusBarPlacer () {
    UIAbilityBar = statusbars.create(50, 6, StatusBarKind.Ability)
    UIAbilityBar.value = 100
    UIAbilityBar.max = 100
    UIAbilityBar.setColor(5, 4)
    UIAbilityBar.setBarBorder(1, 5)
    UIAbilityBar.setFlag(SpriteFlag.RelativeToCamera, true)
    UIAbilityBar.setPosition(80, 4)
    UIAbilityBar.z = 100
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Smoke, function (sprite, otherSprite) {
    timer.throttle("SmokeUndetect", 100, function () {
        GetStatusCondition(3, 100, 1)
    })
})
browserEvents.E.onEvent(browserEvents.KeyEvent.Pressed, function () {
    Skill2()
})
browserEvents.onMouseMove(function (x, y) {
    if (_1GameStarted) {
        Cursor.setPosition(x + (scene.cameraProperty(CameraProperty.X) - scene.screenWidth() / 2), y + (scene.cameraProperty(CameraProperty.Y) - scene.screenHeight() / 2))
    }
})
function Skill1 () {
    if (_1GameStarted) {
        if (0 != SkillsEquippedArray[0]) {
            if (!(Skill1OnCooldown)) {
                Skill1OnCooldown = true
                UseSkill(SkillsEquippedArray[0])
                UISkillSlots.image.drawTransparentImage(assets.image`CooldownIcon`, 20, 1)
                timer.after(SkillCooldownArray[SkillsEquippedArray[0] - 1] - SkillCooldownArray[SkillsEquippedArray[0] - 1] / 100 * (10 * UpgradesLevelArray[4]), function () {
                    UISkillSlots.image.drawTransparentImage(SkillIconArray[SkillsEquippedArray[0] - 1], 20, 1)
                    Skill1OnCooldown = false
                })
            }
        }
    }
}
function StatusEffect (Type: string, Effectiveness: number, DurationMS: number) {
    MenuStatusEffect = miniMenu.createMenu(
    miniMenu.createMenuItem("" + Type + " " + Effectiveness),
    miniMenu.createMenuItem(" ")
    )
    MenuStatusEffect.setFrame(assets.image`MenuFrame0`)
    MenuStatusEffect.setStyleProperty(miniMenu.StyleKind.DefaultAndSelected, miniMenu.StyleProperty.Foreground, 1)
    MenuStatusEffect.setStyleProperty(miniMenu.StyleKind.DefaultAndSelected, miniMenu.StyleProperty.Background, 15)
    MenuStatusEffect.lifespan = DurationMS
    MenuStatusEffect.setFlag(SpriteFlag.RelativeToCamera, true)
    MenuStatusEffectBar = statusbars.create(20, 6, StatusBarKind.Effect)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (_1GameStarted) {
        timer.throttle("Apress", 50, function () {
            if (!(InMenu)) {
                if (tiles.tileAtLocationEquals(Player.tilemapLocation(), assets.tile`Door1`)) {
                    InMenu = true
                    CanMove = false
                    MenuShop = miniMenu.createMenu(
                    miniMenu.createMenuItem("UPGRADE"),
                    miniMenu.createMenuItem("SKILLS"),
                    miniMenu.createMenuItem("COLOR")
                    )
                    MenuShop.setTitle("SHOP")
                    MenuShop.setFrame(assets.image`MenuFrame`)
                    MenuShop.setMenuStyleProperty(miniMenu.MenuStyleProperty.Rows, 1)
                    MenuShop.setMenuStyleProperty(miniMenu.MenuStyleProperty.Columns, 3)
                    MenuShop.setFlag(SpriteFlag.RelativeToCamera, true)
                    MenuShop.setDimensions(148, 40)
                    MenuShop.setPosition(80, 30)
                    MenuShop.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Background, 14)
                    MenuShop.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Foreground, 5)
                    MenuShop.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Foreground, 14)
                    MenuShop.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 5)
                    MenuShop.setStyleProperty(miniMenu.StyleKind.Title, miniMenu.StyleProperty.Background, 14)
                    MenuShop.setStyleProperty(miniMenu.StyleKind.Title, miniMenu.StyleProperty.Foreground, 5)
                    MenuShop.onButtonPressed(controller.B, function (selection, selectedIndex) {
                        MenuShop.close()
                        InMenu = false
                        CanMove = true
                        SaveGame()
                    })
                    MenuShop.onButtonPressed(controller.A, function (selection, selectedIndex) {
                        MenuShop.setButtonEventsEnabled(false)
                        if (selectedIndex == 0) {
                            UnleashTheBigMenu()
                        } else if (selectedIndex == 1) {
                            MenuAbilities = miniMenu.createMenu(
                            miniMenu.createMenuItem("CROUCH", assets.image`CrouchIcon`),
                            miniMenu.createMenuItem("SMOKE", assets.image`SmokeIcon`),
                            miniMenu.createMenuItem("DASH", assets.image`DashIcon`),
                            miniMenu.createMenuItem("SPRINT", assets.image`SprintIcon`),
                            miniMenu.createMenuItem("TOTEM", assets.image`TotemIcon`),
                            miniMenu.createMenuItem("EXIT-TP", assets.image`ExitTpIcon`),
                            miniMenu.createMenuItem("EXTEND", assets.image`ExtendoArmIcon`),
                            miniMenu.createMenuItem("BAGSHOVE", assets.image`BagShoveIcon`),
                            miniMenu.createMenuItem("RADAR", assets.image`ObjectRadarIcon`)
                            )
                            MenuAbilities.setFrame(assets.image`MenuFrame`)
                            MenuAbilities.setMenuStyleProperty(miniMenu.MenuStyleProperty.Rows, 5)
                            MenuAbilities.setMenuStyleProperty(miniMenu.MenuStyleProperty.Columns, 2)
                            MenuAbilities.setFlag(SpriteFlag.RelativeToCamera, true)
                            MenuAbilities.setDimensions(148, 60)
                            MenuAbilities.setPosition(80, 80)
                            MenuAbilities.setMenuStyleProperty(miniMenu.MenuStyleProperty.BackgroundColor, 14)
                            MenuAbilities.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Background, 14)
                            MenuAbilities.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Foreground, 5)
                            MenuAbilities.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Foreground, 14)
                            MenuAbilities.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 5)
                            MenuAbilities.onButtonPressed(controller.A, function (selection, selectedIndex) {
                                if (SkillsOwnedArray[selectedIndex] == 1) {
                                    if (arrays.count(SkillsEquippedArray, selectedIndex + 1) == 0) {
                                        if (game.ask("Equipping skill.", "A: SLOT 1, B: SLOT 2")) {
                                            SkillsEquippedArray[0] = selectedIndex + 1
                                            UISkillSlots.image.drawTransparentImage(SkillIconArray[selectedIndex], 20, 1)
                                        } else {
                                            SkillsEquippedArray[1] = selectedIndex + 1
                                            UISkillSlots.image.drawTransparentImage(SkillIconArray[selectedIndex], 29, 1)
                                        }
                                    } else {
                                        if (game.ask("Unequip Skill?")) {
                                            if (SkillsEquippedArray.indexOf(selectedIndex + 1) == 0) {
                                                UISkillSlots.image.drawTransparentImage(img`
                                                    1 1 1 1 1 1 1 1 
                                                    1 1 1 1 1 1 1 1 
                                                    1 1 1 1 1 1 1 1 
                                                    1 1 1 1 1 1 1 1 
                                                    1 1 1 1 1 1 1 1 
                                                    1 1 1 1 1 1 1 1 
                                                    1 1 1 1 1 1 1 1 
                                                    1 1 1 1 1 1 1 1 
                                                    `, 20, 1)
                                            } else {
                                                UISkillSlots.image.drawTransparentImage(img`
                                                    1 1 1 1 1 1 1 1 
                                                    1 1 1 1 1 1 1 1 
                                                    1 1 1 1 1 1 1 1 
                                                    1 1 1 1 1 1 1 1 
                                                    1 1 1 1 1 1 1 1 
                                                    1 1 1 1 1 1 1 1 
                                                    1 1 1 1 1 1 1 1 
                                                    1 1 1 1 1 1 1 1 
                                                    `, 29, 1)
                                            }
                                            SkillsEquippedArray[SkillsEquippedArray.indexOf(selectedIndex + 1)] = 0
                                        }
                                    }
                                } else {
                                    if (game.ask("Skill is locked.", "Buy for " + SkillsPriceArray[selectedIndex] + "$?")) {
                                        if (StatMoney >= SkillsPriceArray[selectedIndex]) {
                                            game.showLongText("Skill bought! You can now equip it.", DialogLayout.Bottom)
                                            StatMoney += 0 - SkillsPriceArray[selectedIndex]
                                            SkillsOwnedArray[selectedIndex] = 1
                                        } else {
                                            game.showLongText("You need " + (SkillsPriceArray[selectedIndex] - StatMoney) + "$ more to buy this skill.", DialogLayout.Bottom)
                                        }
                                    }
                                }
                            })
                            MenuAbilities.onButtonPressed(controller.B, function (selection, selectedIndex) {
                                MenuAbilities.close()
                                MenuShop.setButtonEventsEnabled(true)
                                SaveGame()
                            })
                        } else if (selectedIndex == 2) {
                            ColorImageArray = []
                            TempNumber = 1
                            TempImage = image.create(8, 8)
                            for (let index = 0; index < 15; index++) {
                                TempImage = image.create(8, 8)
                                TempImage.fill(TempNumber)
                                TempImage.drawRect(0, 0, 8, 8, 1)
                                ColorImageArray.push(TempImage)
                                TempNumber += 1
                            }
                            ColorImageArray.shift()
                            ColorMenuArray = []
                            for (let value of ColorImageArray) {
                                ColorMenuArray.push(miniMenu.createMenuItem("abc", value))
                            }
                            MenuColors = miniMenu.createMenuFromArray(ColorMenuArray)
                            MenuColors.setFrame(assets.image`MenuFrame`)
                            MenuColors.setStyleProperty(miniMenu.StyleKind.DefaultAndSelected, miniMenu.StyleProperty.IconOnly, 1)
                            MenuColors.setMenuStyleProperty(miniMenu.MenuStyleProperty.Columns, 4)
                            MenuColors.setMenuStyleProperty(miniMenu.MenuStyleProperty.Rows, 4)
                            MenuColors.setMenuStyleProperty(miniMenu.MenuStyleProperty.BackgroundColor, 14)
                            MenuColors.setPosition(80, 80)
                            MenuColors.setFlag(SpriteFlag.RelativeToCamera, true)
                            MenuColors.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Background, 14)
                            MenuColors.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 5)
                            MenuColors.onButtonPressed(controller.A, function (selection, selectedIndex) {
                                Player.setImage(assets.image`Player`)
                                PlayerColor = selectedIndex + 2
                                Player.image.replace(14, PlayerColor)
                                SaveGame()
                            })
                            MenuColors.onButtonPressed(controller.B, function (selection, selectedIndex) {
                                MenuColors.close()
                                MenuShop.setButtonEventsEnabled(true)
                            })
                        }
                    })
                } else {
                    for (let value of [
                    assets.tile`Car3`,
                    assets.tile`Car1`,
                    assets.tile`Car4`,
                    assets.tile`Car2`
                    ]) {
                        if (tiles.tileAtLocationEquals(Player.tilemapLocation(), value)) {
                            InMenu = true
                            CanMove = false
                            MenuStageSelect = miniMenu.createMenu(
                            miniMenu.createMenuItem("MISSION 1"),
                            miniMenu.createMenuItem("MISSION 2"),
                            miniMenu.createMenuItem("MISSION 3"),
                            miniMenu.createMenuItem("GRAND DIAMOND HEIST")
                            )
                            MenuStageSelect.setFrame(assets.image`MenuFrame`)
                            MenuStageSelect.setFlag(SpriteFlag.RelativeToCamera, true)
                            MenuStageSelect.setPosition(80, 60)
                            MenuStageSelect.setMenuStyleProperty(miniMenu.MenuStyleProperty.Rows, 4)
                            MenuStageSelect.setMenuStyleProperty(miniMenu.MenuStyleProperty.Columns, 1)
                            MenuStageSelect.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Background, 14)
                            MenuStageSelect.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Foreground, 5)
                            MenuStageSelect.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Foreground, 14)
                            MenuStageSelect.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 5)
                            MenuStageSelect.setStyleProperty(miniMenu.StyleKind.Title, miniMenu.StyleProperty.Foreground, 5)
                            MenuStageSelect.setStyleProperty(miniMenu.StyleKind.Title, miniMenu.StyleProperty.Background, 4)
                            MenuStageSelect.setTitle("A: START, B: DESC.")
                            MenuStageSelect.onButtonPressed(controller.A, function (selection, selectedIndex) {
                                if (MissionsProgress >= selectedIndex + 1) {
                                    MenuStageSelect.close()
                                    InMenu = false
                                    StartStage(selectedIndex + 1)
                                } else {
                                    game.showLongText("Stage is locked! Collect all objectives in previous stage to unlock.", DialogLayout.Center)
                                }
                            })
                            MenuStageSelect.onButtonPressed(controller.B, function (selection, selectedIndex) {
                                if (MissionsProgress >= selectedIndex + 1) {
                                    if (selectedIndex == 0) {
                                        game.showLongText("We're starting you off with a simple task: get some money from this warehouse. OBJECTIVES: PIGGY BANK x2, DOLLAR x2", DialogLayout.Center)
                                    } else if (selectedIndex == 1) {
                                        game.showLongText("The garden has some pretty valuable plants, so go get those for us. OBJECTIVES: BIG GOLDFLOWER x3, POTTED SAPPLING x3", DialogLayout.Center)
                                    } else if (selectedIndex == 2) {
                                        game.showLongText("The museum has plenty of riches, waiting to be taken. OBJECTIVES: GOLD BAR x4, VASE x2, NECKLACE x2", DialogLayout.Center)
                                    } else if (selectedIndex == 3) {
                                        game.showLongText("This is it. OBJECTIVES: GRAND DIAMOND x1", DialogLayout.Center)
                                    }
                                } else {
                                    game.showLongText("Stage is locked! Collect all objectives in previous stage to read its description.", DialogLayout.Center)
                                }
                            })
                        }
                    }
                }
            }
            if (!(IsInHub)) {
                if (tiles.tileAtLocationEquals(Player.tilemapLocation(), assets.tile`Spawn`)) {
                    IsInHub = true
                    info.stopCountdown()
                    sprites.destroyAllSpritesOfKind(SpriteKind.Totem)
                    sprites.destroyAllSpritesOfKind(SpriteKind.Smoke)
                    sprites.destroyAllSpritesOfKind(SpriteKind.Heistable)
                    sprites.destroyAllSpritesOfKind(SpriteKind.Camera)
                    sprites.destroyAllSpritesOfKind(SpriteKind.CameraSight)
                    tiles.setCurrentTilemap(tilemap`Hub`)
                    BagItemCount = 0
                    tiles.placeOnRandomTile(Player, assets.tile`Spawn`)
                    tiles.placeOnRandomTile(ScreenCam, assets.tile`Spawn`)
                    scene.setBackgroundColor(8)
                    if (ObjectivesStolen == LevelObjectives) {
                        if (MissionsProgress == Stage) {
                            game.splash("All objectives stolen!", "Next mission unlocked.")
                            MissionsProgress += 1
                        }
                    }
                    if (Stage == 4) {
                        timer.background(function () {
                            CanMove = false
                            color.startFade(color.originalPalette, color.Black, 5000)
                            timer.after(5500, function () {
                                sprites.destroyAllSpritesOfKind(SpriteKind.UI)
                                sprites.destroyAllSpritesOfKind(SpriteKind.Text)
                                color.startFade(color.Black, color.originalPalette, 250)
                                _0EndingThing = sprites.create(img`
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                    `, SpriteKind.UI)
                                _0Ending_Text = textsprite.create("Thank you for playing!", 0, 1)
                                _0EndingThing.setFlag(SpriteFlag.RelativeToCamera, true)
                                _0Ending_Text.setFlag(SpriteFlag.RelativeToCamera, true)
                                _0Ending_Text.setPosition(80, 0)
                                _0Ending_Text.setVelocity(0, 25)
                                _0Ending_Text.setFlag(SpriteFlag.AutoDestroy, true)
                                timer.after(4000, function () {
                                    _0Ending_Text = textsprite.create("honorable mention :sob:", 0, 1)
                                    _0Ending_Text.setFlag(SpriteFlag.RelativeToCamera, true)
                                    _0Ending_Text.setPosition(80, 0)
                                    _0Ending_Text.setVelocity(0, 120)
                                    timer.after(150, function () {
                                        _0Ending_Text = textsprite.create("ts is NOT getting", 0, 1)
                                        _0Ending_Text.setFlag(SpriteFlag.RelativeToCamera, true)
                                        _0Ending_Text.setPosition(80, 0)
                                        _0Ending_Text.setVelocity(0, 120)
                                    })
                                })
                                timer.after(5000, function () {
                                    game.reset()
                                })
                            })
                        })
                    }
                    Stage = 0
                    ObjectivesStolen = 0
                    timer.background(function () {
                        MoneyEffect = textsprite.create("+" + CurrentRunWorth + "$", 6, 5)
                        MoneyEffect.setFlag(SpriteFlag.RelativeToCamera, true)
                        MoneyEffect.setPosition(80, 60)
                        timer.after(500, function () {
                            spriteutils.moveTo(MoneyEffect, spriteutils.pos(UIMoneyText.x, UIMoneyText.y), 500)
                            timer.after(500, function () {
                                sprites.destroy(MoneyEffect)
                                StatMoney += CurrentRunWorth
                                CurrentRunWorth = 0
                                SaveGame()
                            })
                        })
                    })
                }
            }
        })
    }
})
function IntroSequence () {
    scene.setBackgroundColor(15)
    _3IntroThing = sprites.create(assets.image`Opening`, SpriteKind.UI)
    pause(2000)
    _3IntroThing.setImage(assets.image`Opening0`)
    pause(2000)
    scene.cameraShake(4, 500)
    color.setColor(2, color.rgb(0, 0, 0))
    scene.setBackgroundColor(2)
    color.setColor(2, color.rgb(245, 220, 140), 500)
    _3IntroThing.setImage(assets.image`Opening1`)
    pause(2000)
    color.setColor(2, color.rgb(0, 0, 0), 500)
    _3IntroThing.setImage(assets.image`Opening2`)
    pause(2000)
    scene.setBackgroundColor(15)
    _3IntroThing.setImage(assets.image`Opening3`)
    color.startFade(color.originalPalette, color.White, 2000)
    scene.cameraShake(2, 2000)
    pause(2000)
    color.startFade(color.White, color.Black, 250)
    pause(250)
    sprites.destroy(_3IntroThing)
}
controller.B.onEvent(ControllerButtonEvent.Released, function () {
    if (!(IsInHub)) {
        Skill2()
    }
})
function GetStatusCondition (Status: number, Duration: number, Level: number) {
    if (Status == 1) {
        PlayerSpeedMod += StatPlayerSpeed / 100 * 25 * Level
        Player.startEffect(effects.fountain, Duration)
        timer.after(Duration, function () {
            PlayerSpeedMod += 0 - StatPlayerSpeed / 100 * 25 * Level
        })
    } else if (Status == 2) {
        PlayerSpeedMod += 0 - StatPlayerSpeed / 100 * 25 * Level
        Player.startEffect(effects.none, Duration)
        timer.after(Duration, function () {
            PlayerSpeedMod += StatPlayerSpeed / 100 * 25 * Level
        })
    } else if (Status == 3) {
        if (!(Undetectable)) {
            Undetectable = true
            Player.startEffect(effects.blizzard, Duration)
            timer.after(Duration, function () {
                Undetectable = false
            })
        }
    } else if (Status == 4) {
        PlayerReachMod += StatReach / 100 * 25 * Level
        Player.startEffect(effects.rings, Duration)
        timer.after(Duration, function () {
            PlayerReachMod += 0 - StatReach / 100 * 25 * Level
        })
    } else {
    	
    }
}
info.onCountdownEnd(function () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Smoke)
    sprites.destroyAllSpritesOfKind(SpriteKind.Totem)
    sprites.destroyAllSpritesOfKind(SpriteKind.Heistable)
    sprites.destroyAllSpritesOfKind(SpriteKind.Camera)
    sprites.destroyAllSpritesOfKind(SpriteKind.CameraSight)
    game.showLongText("Mission failed...", DialogLayout.Center)
    color.startFade(color.originalPalette, color.Black, 250)
    pause(250)
    color.startFade(color.Black, color.originalPalette, 250)
    IsInHub = true
    Stage = 0
    tiles.setCurrentTilemap(tilemap`Hub`)
    CurrentRunWorth = 0
    BagItemCount = 0
    tiles.placeOnRandomTile(Player, assets.tile`Spawn`)
    scene.setBackgroundColor(8)
    ObjectivesStolen = 0
    SaveGame()
})
browserEvents.MouseLeft.onEvent(browserEvents.MouseButtonEvent.Pressed, function (x, y) {
    if (_1GameStarted) {
        if (!(spriteutils.distanceBetween(Player, Cursor) > StatReach + PlayerReachMod)) {
            for (let value of [assets.tile`Vent`, assets.tile`Vent2`, assets.tile`MuseumVent`]) {
                if (tiles.tileAtLocationEquals(Cursor.tilemapLocation(), value)) {
                    if (UpgradesLevelArray[5] != 0) {
                        if (tiles.tileAtLocationEquals(Player.tilemapLocation(), assets.tile`VentTile`)) {
                            tiles.placeOnTile(Player, Cursor.tilemapLocation().getNeighboringLocation(CollisionDirection.Bottom))
                            for (let value of sprites.allOfKind(SpriteKind.Heistable)) {
                                value.setFlag(SpriteFlag.Invisible, false)
                            }
                            for (let value of sprites.allOfKind(SpriteKind.Camera)) {
                                value.setFlag(SpriteFlag.Invisible, false)
                            }
                            for (let value of sprites.allOfKind(SpriteKind.CameraSight)) {
                                value.setFlag(SpriteFlag.Invisible, false)
                            }
                            if (Stage == 1) {
                                tiles.setCurrentTilemap(tilemap`WarehouseVentless`)
                            } else if (Stage == 2) {
                                tiles.setCurrentTilemap(tilemap`Garden`)
                            } else if (Stage == 3) {
                                tiles.setCurrentTilemap(tilemap`Museum`)
                            } else {
                            	
                            }
                        } else {
                            tiles.placeOnTile(Player, Cursor.tilemapLocation().getNeighboringLocation(CollisionDirection.Top))
                            for (let value of sprites.allOfKind(SpriteKind.Heistable)) {
                                value.setFlag(SpriteFlag.Invisible, true)
                            }
                            for (let value of sprites.allOfKind(SpriteKind.Camera)) {
                                value.setFlag(SpriteFlag.Invisible, true)
                            }
                            for (let value of sprites.allOfKind(SpriteKind.CameraSight)) {
                                value.setFlag(SpriteFlag.Invisible, true)
                            }
                            if (Stage == 1) {
                                tiles.setCurrentTilemap(tilemap`WarehouseVents`)
                            } else if (Stage == 2) {
                                tiles.setCurrentTilemap(tilemap`GardenVents`)
                            } else if (Stage == 3) {
                                tiles.setCurrentTilemap(tilemap`MuseumVents`)
                            } else {
                            	
                            }
                        }
                    }
                } else {
                    if (Stage == 4) {
                        if (Cursor.overlapsWith(_0GrandDiamond)) {
                            sprites.destroy(_0GrandDiamond)
                            CurrentRunWorth += 99999999
                            scene.cameraShake(6, 1000)
                            timer.after(1000, function () {
                                scene.cameraShake(5, 1000)
                                timer.after(1000, function () {
                                    scene.cameraShake(4, 1000)
                                    timer.after(1000, function () {
                                        scene.cameraShake(3, 1000)
                                        timer.after(1000, function () {
                                            Player.sayText("GOTTA GO!!", 2000, true)
                                            info.startCountdown(20)
                                        })
                                    })
                                })
                            })
                        }
                    }
                    if (BagItemCount < StatBagCapacity) {
                        for (let value of sprites.allOfKind(SpriteKind.Heistable)) {
                            if (Cursor.overlapsWith(value)) {
                                timer.throttle("biast", 50, function () {
                                    sprites.destroy(value)
                                    CurrentRunWorth += sprites.readDataNumber(value, "Worth")
                                    BagItemCount += 1
                                    if (sprites.readDataBoolean(value, "Objective")) {
                                        ObjectivesStolen += 1
                                    }
                                })
                            }
                        }
                    }
                }
            }
        }
    }
})
scene.addSystemMenuEntry_block(assets.image`Money`, "MONEY", function () {
    StatMoney += 1e+25 * 1e+29
})
function UnleashTheBigMenu () {
    MenuUpgrades = miniMenu.createMenu(
    miniMenu.createMenuItem("SPEED lv." + UpgradesLevelArray[0] + "/ " + UpgradesAmmountCostArray[0][UpgradesLevelArray[0] + 1] + "$"),
    miniMenu.createMenuItem("REACH lv." + UpgradesLevelArray[1] + "/ " + UpgradesAmmountCostArray[1][UpgradesLevelArray[1] + 1] + "$"),
    miniMenu.createMenuItem("TIMER lv." + UpgradesLevelArray[2] + "/ " + UpgradesAmmountCostArray[2][UpgradesLevelArray[2] + 1] + "$"),
    miniMenu.createMenuItem("BAG lv." + UpgradesLevelArray[3] + "/ " + UpgradesAmmountCostArray[3][UpgradesLevelArray[3] + 1] + "$"),
    miniMenu.createMenuItem("COOLDOWN lv." + UpgradesLevelArray[4] + "/ " + UpgradesAmmountCostArray[4][UpgradesLevelArray[4] + 1] + "$"),
    miniMenu.createMenuItem("VENTS lv." + UpgradesLevelArray[5] + "/ " + UpgradesAmmountCostArray[5][UpgradesLevelArray[5] + 1] + "$")
    )
    MenuUpgrades.setFrame(assets.image`MenuFrame`)
    MenuUpgrades.setFlag(SpriteFlag.RelativeToCamera, true)
    MenuUpgrades.setDimensions(128, 70)
    MenuUpgrades.setPosition(80, 85)
    MenuUpgrades.setMenuStyleProperty(miniMenu.MenuStyleProperty.ScrollIndicatorColor, 5)
    MenuUpgrades.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Background, 14)
    MenuUpgrades.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Foreground, 5)
    MenuUpgrades.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Foreground, 14)
    MenuUpgrades.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 5)
    MenuUpgrades.onButtonPressed(controller.A, function (selection, selectedIndex) {
        if (UpgradesLevelArray[selectedIndex] == UpgradesAmmountCostArray[selectedIndex][0]) {
            game.showLongText("Upgrade already at max!", DialogLayout.Bottom)
        } else if (StatMoney >= UpgradesAmmountCostArray[selectedIndex][UpgradesLevelArray[selectedIndex] + 1]) {
            StatMoney += 0 - UpgradesAmmountCostArray[selectedIndex][UpgradesLevelArray[selectedIndex] + 1]
            UpgradesLevelArray[selectedIndex] = UpgradesLevelArray[selectedIndex] + 1
            TempNumber = selectedIndex
            MenuUpgrades.close()
            UnleashTheBigMenu()
            for (let index = 0; index < TempNumber; index++) {
                MenuUpgrades.moveSelection(miniMenu.MoveDirection.Down)
            }
            if (selectedIndex == 0) {
                StatPlayerSpeed += 10
            } else if (selectedIndex == 1) {
                StatReach += 8
            } else if (selectedIndex == 2) {
            	
            } else if (selectedIndex == 3) {
                StatBagCapacity += 2
            } else if (selectedIndex == 4) {
            	
            } else if (selectedIndex == 5) {
            	
            }
        } else {
            game.showLongText("You need " + (UpgradesAmmountCostArray[selectedIndex][UpgradesLevelArray[selectedIndex] + 1] - StatMoney) + "$ more to buy this upgrade.", DialogLayout.Bottom)
        }
        SaveGame()
    })
    MenuUpgrades.onButtonPressed(controller.B, function (selection, selectedIndex) {
        MenuUpgrades.close()
        MenuShop.setButtonEventsEnabled(true)
    })
}
tileUtil.onMapLoaded(function (tilemap2) {
    if (!(IsInHub) && !(Stage == 4)) {
        for (let value2 of [
        assets.tile`Wall`,
        assets.tile`Vent`,
        assets.tile`WallBottom`,
        assets.tile`WallTop`,
        assets.tile`TableTop`,
        assets.tile`TableSlot`,
        assets.tile`Counter1`,
        assets.tile`Counter2`,
        assets.tile`PillarTop`,
        assets.tile`Pillar3`,
        assets.tile`PillarBase`,
        assets.tile`WallBottom2`,
        assets.tile`WallTop2`,
        assets.tile`Balcony`,
        assets.tile`BalconyTop`,
        assets.tile`Wall2`,
        assets.tile`Vent2`,
        assets.tile`GardenDisplayPillar`,
        assets.tile`GardenDisplayPillarTop`,
        assets.tile`Shelf2`,
        assets.tile`Shelf3`,
        assets.tile`WallTop3`,
        assets.tile`WallBottom3`,
        assets.tile`MuseumVent`,
        assets.tile`MuseumPillar`,
        assets.tile`MuseumPillar1`,
        assets.tile`MuseumRopeThingies`,
        assets.tile`MuseumRopeThingies0`,
        assets.tile`MuseumPillar2`,
        assets.tile`MuseumPillar0`,
        assets.tile`MuseumBox0`,
        assets.tile`MuseumBox`,
        assets.tile`transparency16`
        ]) {
            for (let value of tiles.getTilesByType(value2)) {
                tiles.setWallAt(value, true)
            }
        }
    }
})
browserEvents.Q.onEvent(browserEvents.KeyEvent.Pressed, function () {
    Skill1()
})
function SaveGame () {
    blockSettings.writeNumber("SaveStatReach", StatReach)
    blockSettings.writeNumber("SaveStatBagcap", StatBagCapacity)
    blockSettings.writeNumber("SaveStatPlayerSpeed", StatPlayerSpeed)
    blockSettings.writeNumber("SaveStatMoney", StatMoney)
    blockSettings.writeNumber("SaveColor", PlayerColor)
    blockSettings.writeNumberArray("SaveUpgrades", UpgradesLevelArray)
    blockSettings.writeNumberArray("SaveSkills", SkillsOwnedArray)
    blockSettings.writeNumberArray("SaveSkillsEquipped", SkillsEquippedArray)
    blockSettings.writeNumber("SaveMissionsProgress", MissionsProgress)
    blockSettings.writeNumber("SaveHasPlayedBefore", 1)
}
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    if (!(IsInHub)) {
        Skill1()
    }
})
function LoadGame () {
    if (blockSettings.exists("SaveStatReach")) {
        StatReach = blockSettings.readNumber("SaveStatReach")
    } else {
        StatReach = 40
    }
    if (blockSettings.exists("SaveStatBagcap")) {
        StatBagCapacity = blockSettings.readNumber("SaveStatBagcap")
    } else {
        StatBagCapacity = 3
    }
    if (blockSettings.exists("SaveStatPlayerSpeed")) {
        StatPlayerSpeed = blockSettings.readNumber("SaveStatPlayerSpeed")
    } else {
        StatPlayerSpeed = 100
    }
    if (blockSettings.exists("SaveStatMoney")) {
        StatMoney = blockSettings.readNumber("SaveStatMoney")
    } else {
        StatMoney = 0
    }
    if (blockSettings.exists("SaveColor")) {
        PlayerColor = blockSettings.readNumber("SaveColor")
    } else {
        PlayerColor = 14
    }
    if (blockSettings.exists("SaveUpgrades")) {
        UpgradesLevelArray = blockSettings.readNumberArray("SaveUpgrades")
    } else {
        UpgradesLevelArray = [
        0,
        0,
        0,
        0,
        0,
        0
        ]
    }
    if (blockSettings.exists("SaveSkills")) {
        SkillsOwnedArray = blockSettings.readNumberArray("SaveSkills")
    } else {
        SkillsOwnedArray = [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
        ]
    }
    if (blockSettings.exists("SaveSkillsEquipped")) {
        SkillsEquippedArray = blockSettings.readNumberArray("SaveSkillsEquipped")
    } else {
        SkillsEquippedArray = [0, 0]
    }
    if (blockSettings.exists("SaveMissionsProgress")) {
        MissionsProgress = blockSettings.readNumber("SaveMissionsProgress")
    } else {
        MissionsProgress = 1
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.CameraSight, function (sprite, otherSprite) {
    if (!(Undetectable)) {
        if (!(Player.tileKindAt(TileDirection.Center, assets.tile`VentTile`))) {
            timer.throttle("CameraSpotted", 50, function () {
                info.changeCountdownBy(-1.75)
                scene.cameraShake(6, 50)
            })
        }
    }
})
function StartGame () {
    SkillIconArray = [
    assets.image`CrouchIcon`,
    assets.image`SmokeIcon`,
    assets.image`DashIcon`,
    assets.image`SprintIcon`,
    assets.image`TotemIcon`,
    assets.image`ExitTpIcon`,
    assets.image`ExtendoArmIcon`,
    assets.image`BagShoveIcon`,
    assets.image`ObjectRadarIcon`
    ]
    LoadGame()
    Cursor = sprites.create(assets.image`CursorSprite`, SpriteKind.CursorKind)
    Cursor.z = 150
    ScreenCam = sprites.create(assets.image`Camera`, SpriteKind.ScreenCam)
    ScreenCam.setFlag(SpriteFlag.Invisible, true)
    ScreenCam.setFlag(SpriteFlag.Ghost, true)
    Player = sprites.create(assets.image`Player`, SpriteKind.Player)
    Player.image.replace(14, PlayerColor)
    UIOverlay = sprites.create(assets.image`HudBar`, SpriteKind.UI)
    UIOverlay.setFlag(SpriteFlag.RelativeToCamera, true)
    UIOverlay.setPosition(80, 4)
    UIOverlay.z = 99
    UIMoneyText = textsprite.create("0", 0, 4)
    UIMoneyText.setIcon(assets.image`MoneyIcon`)
    UIMoneyText.setFlag(SpriteFlag.RelativeToCamera, true)
    UIMoneyText.setPosition(8, 4)
    UIMoneyText.z = 100
    UIBagText = textsprite.create("0/10", 0, 9)
    UIBagText.setIcon(assets.image`BagIcon`)
    UIBagText.setFlag(SpriteFlag.RelativeToCamera, true)
    UIBagText.setPosition(151, 4)
    UIBagText.z = 100
    UISkillSlots = sprites.create(assets.image`HUDthing`, SpriteKind.UI)
    UISkillSlots.setFlag(SpriteFlag.RelativeToCamera, true)
    UISkillSlots.z = 100
    UISkillSlots.setPosition(141, 18)
    if (SkillsEquippedArray[0] != 0) {
        UISkillSlots.image.drawTransparentImage(SkillIconArray[SkillsEquippedArray[0] - 1], 20, 1)
    }
    if (SkillsEquippedArray[1] != 0) {
        UISkillSlots.image.drawTransparentImage(SkillIconArray[SkillsEquippedArray[1] - 1], 29, 1)
    }
    IsInHub = true
    tiles.setCurrentTilemap(tilemap`Hub`)
    tiles.placeOnRandomTile(Player, assets.tile`Spawn`)
    scene.setBackgroundColor(8)
    scene.cameraFollowSprite(ScreenCam)
    BagItemCount = 0
    CanMove = true
    Undetectable = false
    CurrentRunWorth = 0
    ObjectivesStolen = 0
    info.setFontColor_block(2)
    info.setBorderColor_block(2)
    info.setBackgroundColor_block(15)
    PlayerSpeedMod = 0
    UpgradesAmmountCostArray = [
    [
    5,
    10,
    25,
    70,
    150,
    350,
    0
    ],
    [
    5,
    15,
    50,
    100,
    175,
    300,
    0
    ],
    [
    3,
    50,
    150,
    250,
    0
    ],
    [
    6,
    10,
    75,
    125,
    250,
    300,
    500,
    0
    ],
    [
    3,
    50,
    100,
    250,
    0
    ],
    [
    3,
    25,
    75,
    200,
    0
    ]
    ]
    SkillsPriceArray = [
    10,
    50,
    75,
    20,
    75,
    100,
    45,
    75,
    25
    ]
    SkillCooldownArray = [
    4000,
    12000,
    6000,
    5000,
    20000,
    30000,
    9000,
    25000,
    7000
    ]
    game.setDialogFrame(assets.image`MenuFrame1`)
    Player.sayText([
    "Rise and shine!",
    "Beatiful day for some good-old heists.",
    "Im going to Break In And Steal Thingz!!1!",
    "By \"Polishing the game\", we meant adding this.",
    "The Grand Diamond... Shall be mine!",
    "*undecipherable babbling*",
    "Can't start a heist without a good Stealth skill.",
    "I've heard there are some hidden goodies in the Garden.",
    "Another day, another penny.",
    "I like money!",
    "When i was 5 years old, my mother told me happiness was being happy. I didn't understand, so i told her i didn't understand.",
    "Player say get random value from text array.",
    "$$$$",
    "I can do anything!",
    "\"Stealing is fine!\" -Richard",
    "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible. Yellow, black. Yellow, black. Yellow, black. Yellow, black. Ooh, black and yellow! Let's shake it up a little. Barry! Breakfast is ready! Coming! Hang on a second. Hello? Barry? Adam? Can you believe this is happening? I can't.",
    "Radar is a STEAL Skill. It highlits all objectives and creates arrows that point towards them. Useful on your first time in a big map.",
    "Dash is a STEALTH Skill. It makes you instantly travel forward and makes you UNDETECTable for one second. It can be used to skip over small walls and obstacles.",
    "Totem is a SPEED Skill. It creates a totem that gives you constant speed when you are near it. It is most useful on frequently travelled areas and smaller maps.",
    "Bag-shove is a STEAL Skill. It shoves one stolen item deep into your bag, making space for more items. It does not delete the item and you will still make money from it.",
    "I also like food!",
    "Vents are useful for getting around faster and bypassing cameras. But getting caught using them makes you suspicious.",
    "Man, i hope im not eternay trapped in this little shop area because nothing else exists beyond!",
    "Originally i would have gotten 5 missions before the big heist, but they cut it down to 3.",
    "Huh? What is my name? Its a secret.",
    "Blocks with big arrays tend to become unreasonably large.",
    "For element value of list, my beloved.",
    "Make sure to actually equip the skills you buy.",
    "Minor spelling mistakes have been made.",
    "ITS! HEIST! TIMEEEEE!!!!",
    "I wonder why they named a store \"Upgrades\".",
    "How can a skill make me teleport? I don't really wanna know...",
    "Hello World!",
    "Its almost like we are constantly... UNDER SURVEILLANCE...",
    "I don't feel like talking today.",
    "I love water. Hydration is amazing. 10/10, i reccomend.",
    "Chess Battle Advanced.",
    "Didn't you see the news today? I heard they said it looked like rain.",
    "I also like cheese.",
    "There are people who will reset the game to read these. To such people, i am sorry.",
    "Less talking, more stealing!",
    "I... nevermind i forgot.",
    "Auctioneers have surprisingly great rythym.",
    "When the",
    "cuando haces tu momos, but no sabes que momos hacer",
    "Oh well, too bad. HEIST BEEEEEEEEAAAAAAAAAAAAMMMMMMMMMMMMMMM!!!!!!!!!!!!!!!!!!",
    "I'm rapidly running out of things to say.",
    "You can't win by only buying skills, remember to upgrade!",
    "Human, i remember you're HEISTs...",
    "mony",
    "If i find it on the floor, is it reeeaally stealing?",
    "Officer, in my defense, i got too silly"
    ]._pickRandom(), 5000, true)
    SaveGame()
}
function StartStage (StageNumber: number) {
    IsInHub = false
    Stage = StageNumber
    scene.setBackgroundColor(15)
    if (StageNumber == 1) {
        info.startCountdown(30 + UpgradesLevelArray[2] * 7.5)
        tiles.setCurrentTilemap(tilemap`WarehouseVentless`)
        tiles.placeOnRandomTile(Player, assets.tile`Spawn`)
        PlaceCamera([5, 5], 90)
        PlaceCamera([16, 5], 90)
        SetObject(assets.image`PiggyBank`, 15, 2, [assets.tile`TableSlot`], true)
        SetObject(assets.image`Money`, 20, 2, [assets.tile`TableSlot`], true)
        SetObject(assets.image`Coins`, 3, 2, [assets.tile`TableTop`], false)
    } else if (StageNumber == 2) {
        info.startCountdown(55 + UpgradesLevelArray[2] * 7.5)
        tiles.setCurrentTilemap(tilemap`Garden`)
        tiles.placeOnRandomTile(Player, assets.tile`Spawn`)
        SetObject(assets.image`Coins`, 3, 2, [assets.tile`TableTop`], false)
        SetObject(assets.image`Goldflower`, 15, 3, [assets.tile`Grass`], true)
        SetObject(assets.image`GoldflowerSmall`, 10, 4, [assets.tile`Grass`], false)
        SetObject(assets.image`GoldBar`, 65, 2, [assets.tile`GardenDisplayPillarTop`], false)
        SetObject(assets.image`Plant`, 20, 3, [assets.tile`TableSlot`], true)
        SetObject(assets.image`Fertilizer`, 15, 3, [assets.tile`Shelf2`, assets.tile`Shelf3`], false)
        SetObject(assets.image`Fertilizer`, 15, 2, [assets.tile`DirtyFloor`], false)
        PlaceCamera([22, 29], 0)
        PlaceCamera([29, 29], 180)
    } else if (StageNumber == 3) {
        info.startCountdown(90 + UpgradesLevelArray[2] * 7.5)
        tiles.setCurrentTilemap(tilemap`Museum`)
        tiles.placeOnRandomTile(Player, assets.tile`Spawn`)
        SetObject(assets.image`GoldflowerSmall`, 10, 4, [assets.tile`Grass`], false)
        SetObject(assets.image`Pearl`, 35, 4, [assets.tile`MuseumPillar1`], false)
        SetObject(assets.image`GoldBar`, 65, 4, [assets.tile`MuseumPillar2`], true)
        SetObject(assets.image`Pot`, 45, 2, [assets.tile`MuseumBox0`], true)
        SetObject(assets.image`Necklace`, 55, 2, [assets.tile`Counter1`], true)
        PlaceCamera([21, 27], 90)
        PlaceCamera([26, 27], 90)
        PlaceCamera([18, 27], 90)
        PlaceCamera([29, 27], 90)
        PlaceCamera([22, 10], 90)
        PlaceCamera([25, 10], 90)
        PlaceCamera([19, 14], 90)
        PlaceCamera([38, 21], 270)
        PlaceCamera([42, 21], 270)
    } else if (StageNumber == 4) {
        tiles.setCurrentTilemap(tilemap`Escape`)
        tiles.placeOnRandomTile(Player, assets.tile`Spawn`)
        _0GrandDiamond = sprites.create(assets.image`GrandDiamond`, SpriteKind.Finale)
        tiles.placeOnRandomTile(_0GrandDiamond, assets.tile`Pillar5`)
        _0GrandDiamond.x += 9
        _0GrandDiamond.y += -10
    }
    Skill1OnCooldown = false
    Skill2OnCooldown = false
    if (0 != SkillsEquippedArray[1]) {
        UISkillSlots.image.drawTransparentImage(SkillIconArray[SkillsEquippedArray[1] - 1], 29, 1)
    }
    if (0 != SkillsEquippedArray[0]) {
        UISkillSlots.image.drawTransparentImage(SkillIconArray[SkillsEquippedArray[0] - 1], 20, 1)
    }
    CanMove = true
    LevelObjectives = 0
    for (let value of sprites.allOfKind(SpriteKind.Heistable)) {
        if (sprites.readDataBoolean(value, "Objective")) {
            LevelObjectives += 1
        }
    }
}
function UseSkill (SkillNum: number) {
    if (SkillNum == 1) {
        GetStatusCondition(2, 2000, 2)
        GetStatusCondition(3, 2000, 1)
    } else if (SkillNum == 2) {
        sprites.destroyAllSpritesOfKind(SpriteKind.Smoke)
        for (let index = 0; index < 16; index++) {
            TempSprite = sprites.create([assets.image`SmokeCloud`, assets.image`SmokeCloud0`, assets.image`SmokeCloud1`]._pickRandom(), SpriteKind.Smoke)
            TempSprite.lifespan = 6000
            animation.runMovementAnimation(
            TempSprite,
            animation.animationPresets(animation.bobbing),
            6000,
            false
            )
            spriteutils.placeAngleFrom(
            TempSprite,
            spriteutils.degreesToRadians(randint(1, 360)),
            randint(0, 50),
            Player
            )
        }
        for (let index = 0; index < 20; index++) {
            TempSprite = sprites.create([assets.image`SmokeCloud`, assets.image`SmokeCloud0`, assets.image`SmokeCloud1`]._pickRandom(), SpriteKind.Smoke)
            TempSprite.lifespan = 6000
            animation.runMovementAnimation(
            TempSprite,
            animation.animationPresets(animation.bobbing),
            6000,
            false
            )
            spriteutils.placeAngleFrom(
            TempSprite,
            spriteutils.degreesToRadians(randint(1, 360)),
            randint(50, 70),
            Player
            )
        }
    } else if (SkillNum == 3) {
        TempSprite = sprites.create(assets.image`MoneyIcon`, SpriteKind.UI)
        TempSprite.setFlag(SpriteFlag.Invisible, true)
        TempSprite.lifespan = 50
        spriteutils.placeAngleFrom(
        TempSprite,
        spriteutils.angleFrom(Player, Cursor),
        60,
        Player
        )
        GetStatusCondition(3, 1000, 1)
        if (!(tiles.tileAtLocationIsWall(TempSprite.tilemapLocation()))) {
            tiles.placeOnTile(Player, TempSprite.tilemapLocation())
        } else {
            spriteutils.placeAngleFrom(
            TempSprite,
            spriteutils.angleFrom(Player, Cursor),
            40,
            Player
            )
            if (!(tiles.tileAtLocationIsWall(TempSprite.tilemapLocation()))) {
                tiles.placeOnTile(Player, TempSprite.tilemapLocation())
            } else {
                spriteutils.placeAngleFrom(
                TempSprite,
                spriteutils.angleFrom(Player, Cursor),
                20,
                Player
                )
                if (!(tiles.tileAtLocationIsWall(TempSprite.tilemapLocation()))) {
                    tiles.placeOnTile(Player, TempSprite.tilemapLocation())
                } else {
                    spriteutils.placeAngleFrom(
                    TempSprite,
                    spriteutils.angleFrom(Player, Cursor),
                    10,
                    Player
                    )
                    if (!(tiles.tileAtLocationIsWall(TempSprite.tilemapLocation()))) {
                        tiles.placeOnTile(Player, TempSprite.tilemapLocation())
                    } else {
                        scene.cameraShake(5, 500)
                    }
                }
            }
        }
    } else if (SkillNum == 4) {
        GetStatusCondition(1, 2000, 3)
    } else if (SkillNum == 5) {
        sprites.destroyAllSpritesOfKind(SpriteKind.Totem)
        spriteutils.placeAngleFrom(
        sprites.create(assets.image`Totem`, SpriteKind.Totem),
        0,
        0,
        Player
        )
    } else if (SkillNum == 6) {
        if (Stage != 4) {
            tiles.placeOnRandomTile(Player, assets.tile`Spawn`)
        } else {
            game.showLongText("No, that would be like... really lame.", DialogLayout.Bottom)
        }
    } else if (SkillNum == 7) {
        GetStatusCondition(4, 5000, 2)
    } else if (SkillNum == 8) {
        if (BagItemCount >= 1) {
            BagItemCount += -1
        } else {
            scene.cameraShake(3, 250)
        }
    } else if (SkillNum == 9) {
        for (let value of arrays.range(1, 360, 10)) {
            TempSprite = sprites.create(assets.image`RadarThingymabop`, SpriteKind.UI)
            spriteutils.placeAngleFrom(
            TempSprite,
            0,
            0,
            Player
            )
            spriteutils.setVelocityAtAngle(TempSprite, spriteutils.degreesToRadians(value), 180)
            TempSprite.lifespan = 2000
            TempSprite.setFlag(SpriteFlag.GhostThroughWalls, true)
        }
        for (let value of sprites.allOfKind(SpriteKind.Heistable)) {
            if (sprites.readDataBoolean(value, "Objective")) {
                TempSprite = sprites.create(assets.image`Arrow`, SpriteKind.UI)
                spriteutils.placeAngleFrom(
                TempSprite,
                spriteutils.angleFrom(Player, value),
                50,
                Player
                )
                transformSprites.rotateSprite(TempSprite, spriteutils.radiansToDegrees(spriteutils.angleFrom(TempSprite, value)))
                TempSprite.lifespan = 2000
                value.startEffect(effects.halo, 2000)
            }
        }
    }
}
function PlaceCamera (PositionArray: number[], Direction: number) {
    SecurityCamera = sprites.create(assets.image`CameraSprite`, SpriteKind.Camera)
    transformSprites.rotateSprite(SecurityCamera, Direction)
    tiles.placeOnTile(SecurityCamera, tiles.getTileLocation(PositionArray[0], PositionArray[1]))
    SecurityCameraSight = sprites.create(assets.image`CameraSight`, SpriteKind.CameraSight)
    SecurityCameraSight.z = 50
    sprites.setDataNumber(SecurityCameraSight, "Direction", Direction)
    spriteutils.placeAngleFrom(
    SecurityCameraSight,
    spriteutils.degreesToRadians(transformSprites.getRotation(SecurityCamera)),
    37,
    SecurityCamera
    )
}
function Skill2 () {
    if (_1GameStarted) {
        if (0 != SkillsEquippedArray[1]) {
            if (!(Skill2OnCooldown)) {
                Skill2OnCooldown = true
                UseSkill(SkillsEquippedArray[1])
                UISkillSlots.image.drawTransparentImage(assets.image`CooldownIcon`, 29, 1)
                timer.after(SkillCooldownArray[SkillsEquippedArray[1] - 1] - SkillCooldownArray[SkillsEquippedArray[1] - 1] / 100 * (10 * UpgradesLevelArray[4]), function () {
                    UISkillSlots.image.drawTransparentImage(SkillIconArray[SkillsEquippedArray[1] - 1], 29, 1)
                    Skill2OnCooldown = false
                })
            }
        }
    }
}
function SetObject (Image2: Image, Worth: number, Ammount: number, SpawnTileArray: Image[], IsObjective: boolean) {
    for (let index = 0; index < Ammount; index++) {
        TakenLocationArray = []
        for (let value of sprites.allOfKind(SpriteKind.Heistable)) {
            TakenLocationArray.push([value.tilemapLocation().column, value.tilemapLocation().row])
        }
        Object2 = sprites.create(Image2, SpriteKind.Heistable)
        sprites.setDataNumber(Object2, "Worth", Worth)
        sprites.setDataBoolean(Object2, "Objective", IsObjective)
        tiles.placeOnRandomTile(Object2, SpawnTileArray._pickRandom())
        if (arrays.count(TakenLocationArray, [Object2.tilemapLocation().column, Object2.tilemapLocation().row]) != 0) {
            AvailableLocationArray = []
            for (let value of tiles.getTilesByType(SpawnTileArray._pickRandom())) {
                AvailableLocationArray.push([value.column, value.row])
            }
            arrays.difference(AvailableLocationArray, TakenLocationArray)
            tiles.placeOnTile(Object2, tiles.getTileLocation(AvailableLocationArray[0][0], AvailableLocationArray[0][1]))
        }
    }
}
let AvailableLocationArray: number[][] = []
let Object2: Sprite = null
let TakenLocationArray: number[][] = []
let SecurityCameraSight: Sprite = null
let SecurityCamera: Sprite = null
let TempSprite: Sprite = null
let Skill2OnCooldown = false
let UIBagText: TextSprite = null
let UIOverlay: Sprite = null
let UpgradesAmmountCostArray: number[][] = []
let MenuUpgrades: miniMenu.MenuSprite = null
let StatBagCapacity = 0
let _0GrandDiamond: Sprite = null
let StatReach = 0
let PlayerReachMod = 0
let Undetectable = false
let StatPlayerSpeed = 0
let PlayerSpeedMod = 0
let _3IntroThing: Sprite = null
let UIMoneyText: TextSprite = null
let CurrentRunWorth = 0
let MoneyEffect: TextSprite = null
let _0Ending_Text: TextSprite = null
let _0EndingThing: Sprite = null
let Stage = 0
let LevelObjectives = 0
let ObjectivesStolen = 0
let ScreenCam: Sprite = null
let BagItemCount = 0
let IsInHub = false
let MissionsProgress = 0
let MenuStageSelect: miniMenu.MenuSprite = null
let PlayerColor = 0
let MenuColors: miniMenu.MenuSprite = null
let ColorMenuArray: miniMenu.MenuItem[] = []
let TempImage: Image = null
let TempNumber = 0
let ColorImageArray: Image[] = []
let StatMoney = 0
let SkillsPriceArray: number[] = []
let SkillsOwnedArray: number[] = []
let MenuAbilities: miniMenu.MenuSprite = null
let MenuShop: miniMenu.MenuSprite = null
let CanMove = false
let Player: Sprite = null
let InMenu = false
let MenuStatusEffectBar: StatusBarSprite = null
let MenuStatusEffect: miniMenu.MenuSprite = null
let SkillIconArray: Image[] = []
let UpgradesLevelArray: number[] = []
let SkillCooldownArray: number[] = []
let UISkillSlots: Sprite = null
let Skill1OnCooldown = false
let SkillsEquippedArray: number[] = []
let Cursor: Sprite = null
let UIAbilityBar: StatusBarSprite = null
let _2MainMenu: miniMenu.MenuSprite = null
let _1GameStarted = false
if (blockSettings.exists("SaveHasPlayedBefore")) {
	
} else {
    IntroSequence()
}
_1GameStarted = false
color.startFade(color.Black, color.originalPalette, 250)
scene.setBackgroundColor(8)
let _2Logo = sprites.create(assets.image`Gamename`, SpriteKind.UI)
_2Logo.setPosition(80, -70)
spriteutils.moveTo(_2Logo, spriteutils.pos(80, 40), 250)
timer.after(350, function () {
    scene.cameraShake(6, 250)
    _2MainMenu = miniMenu.createMenu(
    miniMenu.createMenuItem("START"),
    miniMenu.createMenuItem("DATA WIPE")
    )
    _2MainMenu.setPosition(200, 90)
    spriteutils.moveTo(_2MainMenu, spriteutils.pos(80, 90), 500, false)
    _2MainMenu.setFrame(assets.image`MenuFrame`)
    _2MainMenu.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Foreground, 5)
    _2MainMenu.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Background, 14)
    _2MainMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 5)
    _2MainMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Foreground, 14)
    _2MainMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
        if (selectedIndex == 0) {
            sprites.destroy(_2Logo)
            _2MainMenu.close()
            StartGame()
            _1GameStarted = true
        } else {
            if (game.ask("Wipe your data?", "No getting it back.")) {
                if (game.ask("Actually wipe your data??")) {
                    if (game.ask("Wait for real????")) {
                        if (game.ask("Ok i guess.", "This will erase your data.")) {
                            scene.cameraShake(8, 500)
                            color.startFade(color.originalPalette, color.Black, 500)
                            timer.after(500, function () {
                                blockSettings.clear()
                                game.reset()
                            })
                        }
                    }
                }
            }
        }
    })
    timer.after(500, function () {
        scene.cameraShake(6, 250)
    })
})
forever(function () {
    if (_1GameStarted) {
        for (let value of sprites.allOfKind(SpriteKind.CameraSight)) {
            pause(15)
            value.setImage(assets.image`CameraSight`)
            transformSprites.rotateSprite(value, sprites.readDataNumber(value, "Direction"))
            value.image.replace(4, 9)
            value.image.replace(11, 8)
            value.image.replace(9, 0)
            value.image.replace(8, 9)
            pause(15)
            value.setImage(assets.image`CameraSight`)
            transformSprites.rotateSprite(value, sprites.readDataNumber(value, "Direction"))
            value.image.replace(4, 9)
            value.image.replace(11, 8)
            value.image.replace(8, 0)
        }
    }
})
forever(function () {
    if (_1GameStarted) {
        for (let value of [
        assets.tile`Car3`,
        assets.tile`Car1`,
        assets.tile`Car4`,
        assets.tile`Car2`
        ]) {
            if (tiles.tileAtLocationEquals(Player.tilemapLocation(), value)) {
                Player.sayText("A to select stage!", 250, false)
            }
        }
        if (tiles.tileAtLocationEquals(Player.tilemapLocation(), assets.tile`Door1`)) {
            Player.sayText("A to enter Shop!", 250, false)
        }
        if (tiles.tileAtLocationEquals(Player.tilemapLocation(), assets.tile`Spawn`)) {
            if (!(IsInHub)) {
                Player.sayText("A to exit level!", 250, false)
            }
        }
    }
})
forever(function () {
    if (_1GameStarted) {
        UIMoneyText.setText(convertToText(StatMoney))
        UIMoneyText.setPosition(5 + convertToText(StatMoney).length * 3, 4)
        UIBagText.setText("" + convertToText(BagItemCount) + "/" + convertToText(StatBagCapacity))
        UIBagText.setPosition(153 - (convertToText(StatBagCapacity).length * 3 + convertToText(BagItemCount).length * 3), 4)
        if (spriteutils.distanceBetween(Player, Cursor) > StatReach + PlayerReachMod) {
            Cursor.setImage(assets.image`CursorSpriteFar`)
        } else {
            Cursor.setImage(assets.image`CursorSprite`)
        }
        if (CanMove) {
            if (tiles.tileAtLocationEquals(Player.tilemapLocation(), assets.tile`VentTile`)) {
                controller.moveSprite(Player, StatPlayerSpeed + (UpgradesLevelArray[5] - 1) * 15 + PlayerSpeedMod, StatPlayerSpeed + (UpgradesLevelArray[5] - 1) * 15 + PlayerSpeedMod)
            } else {
                controller.moveSprite(Player, StatPlayerSpeed + PlayerSpeedMod, StatPlayerSpeed + PlayerSpeedMod)
            }
        } else {
            controller.moveSprite(Player, 0, 0)
        }
        for (let value of sprites.allOfKind(SpriteKind.Totem)) {
            if (spriteutils.distanceBetween(value, Player) < 80) {
                timer.throttle("TotemSpeedBuff", 100, function () {
                    value.startEffect(effects.warmRadial, 100)
                    GetStatusCondition(1, 100, 2)
                })
            }
        }
        for (let value of [assets.tile`Vent`, assets.tile`Vent2`, assets.tile`MuseumVent`]) {
            if (tiles.tileAtLocationEquals(Cursor.tilemapLocation(), value) && UpgradesLevelArray[5] != 0) {
                Cursor.sayText("Click to use Vent!", 100, false)
            } else {
                if (Stage == 4) {
                    if (Cursor.overlapsWith(_0GrandDiamond)) {
                        Cursor.sayText("Value: " + "99999999" + "$" + "." + " " + "Its all mine.", 100, false)
                    }
                }
                for (let value of sprites.allOfKind(SpriteKind.Heistable)) {
                    if (Cursor.overlapsWith(value)) {
                        if (sprites.readDataBoolean(value, "Objective")) {
                            Cursor.sayText("Value: " + sprites.readDataNumber(value, "Worth") + "$" + "," + " " + "Objective!", 100, false)
                        } else {
                            Cursor.sayText("Value: " + sprites.readDataNumber(value, "Worth") + "$", 100, false)
                        }
                    }
                }
            }
        }
    }
})
/**
 * BEWARE - JANKY CODE BELOW! Also hi!!!1!
 */
game.onUpdate(function () {
    if (_1GameStarted) {
        spriteutils.placeAngleFrom(
        ScreenCam,
        spriteutils.angleFrom(Player, ScreenCam),
        spriteutils.distanceBetween(ScreenCam, Player) * 0.8,
        Player
        )
    }
})
