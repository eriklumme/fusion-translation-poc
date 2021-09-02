package org.vaadin.erik.fusiontranslations.data.endpoint;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.ResourceBundle;

import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.vaadin.flow.server.VaadinSession;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.flow.server.connect.Endpoint;

/**
 * @author erik@vaadin.com
 * @since 20.8.2021
 */
@Endpoint
@AnonymousAllowed
public class TranslationEndpoint {

    /*
     This is useful when using static files. If the content of the resource bundle is dynamic,
     then this is not a proper solution.

     The usefulness of this also depends on how the resource bundles are cached in the
     ResourceBundle class.
     */
    private static final Map<ResourceBundle, ObjectNode> jsonCache = new HashMap<>();

    private static final ObjectMapper objectMapper = new ObjectMapper();

    private final HttpSession httpSession;

    public TranslationEndpoint(HttpSession httpSession) {
        this.httpSession = httpSession;
    }

    public ObjectNode loadTranslations(String language) {
        Locale locale = Locale.forLanguageTag(language);
        ResourceBundle resourceBundle = ResourceBundle.getBundle("messages", locale);

        // Don't use a static cache during development
        if (isDevelopmentMode()) {
            return convertBundleToJson(resourceBundle);
        }
        return jsonCache.computeIfAbsent(resourceBundle, this::convertBundleToJson);
    }

    private ObjectNode convertBundleToJson(ResourceBundle resourceBundle) {
        ObjectNode result = objectMapper.createObjectNode();
        for (String key: resourceBundle.keySet()) {
            ObjectNode currentObject = result;
            String[] keyParts = key.split("\\.");

            for (int i = 0; i < keyParts.length - 1; i++) {
                String part = keyParts[i];
                ObjectNode nextObject = (ObjectNode) currentObject.get(part);
                if (nextObject == null) {
                    nextObject = objectMapper.createObjectNode();
                    currentObject.set(part, nextObject);
                }
                currentObject = nextObject;
            }
            currentObject.put(keyParts[keyParts.length - 1], resourceBundle.getString(key));
        }
        return result;
    }

    private boolean isDevelopmentMode() {
        Object vaadinSession =
                httpSession.getAttribute("com.vaadin.flow.server.VaadinSession.springServlet");
        if (vaadinSession instanceof VaadinSession) {
            return !((VaadinSession) vaadinSession).getService()
                    .getDeploymentConfiguration().isProductionMode();
        }
        return false;
    }
}
