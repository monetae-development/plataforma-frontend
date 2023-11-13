import { IThemeAssetContributor } from '@app/shared/layout/themes/ThemeAssetContributor';
import { ThemeHelper } from '@app/shared/layout/themes/ThemeHelper';
import { DefaultThemeAssetContributor } from '@app/shared/layout/themes/default/DefaultThemeAssetContributor';
import { Theme2ThemeAssetContributor } from '@app/shared/layout/themes/theme2/Theme2ThemeAssetContributor';
import { Theme6ThemeAssetContributor } from '@app/shared/layout/themes/theme6/Theme6ThemeAssetContributor';
import { Theme8ThemeAssetContributor } from '@app/shared/layout/themes/theme8/Theme8ThemeAssetContributor';
import { Theme13ThemeAssetContributor } from '@app/shared/layout/themes/theme13/Theme13ThemeAssetContributor';
export class ThemeAssetContributorFactory {
    static getCurrent(): IThemeAssetContributor {
        let theme = ThemeHelper.getTheme();

        if (theme === 'default') {
            return new DefaultThemeAssetContributor();
        }

        if (theme === 'theme6') {
            return new Theme6ThemeAssetContributor();
        }

        if (theme === 'theme8') {
            return new Theme8ThemeAssetContributor();
        }

        if (theme === 'theme13') {
            return new Theme13ThemeAssetContributor();
        }

        return null;
    }
}
